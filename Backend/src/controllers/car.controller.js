import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Car } from "../models/car.models.js";

const carListing = asyncHandler(async (req, res) => {
  const {
    brand,
    model,
    year,
    perDayPrice,
    category,
    transmission,
    fuelType,
    seatingCapacity,
    location,
    description,
  } = req.body;

  const image = req.file?.path;

  if (
    [
      brand,
      model,
      year,
      perDayPrice,
      category,
      transmission,
      fuelType,
      seatingCapacity,
      location,
      description,
    ].some((item) => item == "") ||
    !image
  ) {
    throw new ApiError(400, "Fill all details");
  }

  const uploadedImage = await uploadOnCloudinary(image);

  if (!uploadedImage) {
    throw new ApiError(500, "Cloudinary uploading error");
  }

  const car = await Car.create({
    brand,
    model,
    year,
    perDayPrice,
    category,
    transmission,
    fuelType,
    seatingCapacity,
    location,
    description,
    image: {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    },
    owner: req.user._id,
  });

  if (!car) {
    throw new ApiError(500, "something went wrong while saving car data in DB");
  }

  const createdCar = await Car.findById(car._id);
  return res
    .status(201)
    .json(new ApiResponse(201, createdCar, "you car is listed successfully"));
});

export { carListing };
