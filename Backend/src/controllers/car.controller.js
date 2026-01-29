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
  console.log(req.body, req.file);
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

const getAllCars = asyncHandler(async (req, res) => {
  const car = await Car.find();
  return res
    .status(200)
    .json(new ApiResponse(200, car, "All cars fetched successfully"));
});

const search = asyncHandler(async (req, res) => {
  const { selectLocation } = req.body;

  if (!selectLocation) {
    throw new ApiError(400, "Give location");
  }

  const cars = await Car.find({ isListed: true, location: selectLocation });

  return res.status(200).json(
    new ApiResponse(
      200,
      cars, // can be empty array []
      cars.length ? "Vehicles found" : "No vehicles found in this location",
    ),
  );
});

const searchCar = asyncHandler(async (req, res) => {
  const { search } = req.body;

  const query = search?.trim();

  let cars;

  if (!query) {
    cars = await Car.find({ isListed: true });
  } else {
    cars = await Car.find({
      isListed: true,
      $or: [
        { brand: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { transmission: { $regex: query, $options: "i" } },
        { fuelType: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        cars,
        cars.length ? "Vehicles found" : "No vehicles found",
      ),
    );
});

const updateCarDetails = asyncHandler(async (req, res) => {
  const { perDayPrice, status, carId } = req.body;
  if (!perDayPrice || !carId) {
    throw new ApiError(400, "Give details to update");
  }

  const car = await Car.findByIdAndUpdate(
    carId,
    { isAvailable: status, perDayPrice },
    { new: true, runValidators: true },
  );

  if (!car) {
    throw new ApiError(
      500,
      "something went wrong while updated the car details",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, car, "Car details updated successfully"));
});

const unlist = asyncHandler(async (req, res) => {
  const { carId, isListed } = req.body;

  if (!carId) {
    throw new ApiError(400, "Car id not send");
  }

  const car = await Car.findByIdAndUpdate(
    carId,
    { isListed: isListed },
    { new: true, runValidators: true },
  );
  if (!car) {
    throw new ApiError(500, "Something went wrong while deleting car");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, car, "Car deleted successfully"));
});

export { carListing, getAllCars, search, searchCar, updateCarDetails, unlist };
