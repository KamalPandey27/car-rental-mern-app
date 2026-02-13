import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import { sendEmail } from "../utils/sendMail.js";
const option = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};
console.log("cookie option", option);
// for production use this
// const option = {
// httpOnly: true,
// secure: true,
// sameSite: "none"};

const generateAccessRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessTokens();
    const refreshToken = await user.generateRefreshTokens();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while gererating refresh and access tokens",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username && password && email)) {
    throw new ApiError(400, "Please fill all details");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already existed");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const { accessToken, refreshToken } = await generateAccessRefreshTokens(
    user._id,
  );

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res
    .status(201)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(201, createdUser, "User created successfully Done"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new ApiError(400, "Fill email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password not correct");
  }

  const { refreshToken, accessToken } = await generateAccessRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, loggedInUser, "successfully login user"));
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    await User.findOneAndUpdate(
      { refreshToken },
      { $unset: { refreshToken: 1 } },
    );
  }

  return res
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, null, "Logged out"));
});

const getUserData = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  try {
    // 1️⃣ Try access token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded._id).select(
      "-password -refreshToken",
    );

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User fetched via access token"));
  } catch (error) {
    // 2️⃣ If access token expired, try refresh token
    if (!refreshToken) {
      throw new ApiError(401, "unauthorized request");
    }

    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken._id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = await user.generateAccessTokens();

    const verifiedUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    return res
      .status(200)
      .cookie("accessToken", newAccessToken, option)
      .json(new ApiResponse(200, verifiedUser, "Auto login via refresh token"));
  }
});

const AddUserAvatar = asyncHandler(async (req, res) => {
  const localFilePath = req.file?.path;

  if (!localFilePath) {
    throw new ApiError(401, "File not get");
  }

  const uploadedImage = await uploadOnCloudinary(localFilePath);

  if (!uploadedImage) {
    throw new ApiError(500, "Cloudinary upload failed");
  }

  const user = await User.findById(req.user._id);

  if (user.avatar?.public_id) {
    await cloudinary.uploader.destroy(user.avatar.public_id);
  }

  user.avatar = {
    public_id: uploadedImage.public_id,
    url: uploadedImage.secure_url,
  };

  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "image updated successfully"));
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Please provide your email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  const otp = Math.floor(Math.random() * 900000).toString();
  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");
  user.forgotPasswordOTP = hashedOTP;
  user.forgotPasswordOTPExpiry = Date.now() + 15 * 60 * 1000;

  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Password Reset OTP",
    html: `<h2>Your OTP is ${otp}</h2><p>Valid for 10 minutes</p>`,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "OTP sent to your email"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    throw new ApiError(400, "Fill details");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("404", "User not found");
  }

  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  if (
    user.forgotPasswordOTP !== hashedOTP ||
    user.forgotPasswordOTPExpiry < Date.now()
  ) {
    throw new ApiError(400, "Invalid or expire otp");
  }

  user.password = newPassword;
  user.forgotPasswordOTP = undefined;
  user.forgotPasswordOTPExpiry = undefined;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset successfully"));
});

export {
  registerUser,
  login,
  logout,
  getUserData,
  AddUserAvatar,
  forgetPassword,
  resetPassword,
};
