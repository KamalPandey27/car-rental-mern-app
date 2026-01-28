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

  const car = await Car.find({ location: selectLocation });
  if (car.length == 0) {
    throw new ApiError(404, "Now in this location not present any vehichle");
  }
  res
    .status(200)
    .json(new ApiResponse(200, car, "successfully find some vehichle"));
});

const searchCar = asyncHandler(async (req, res) => {
  const { search } = req.body;

  let cars;

  if (!search || search.trim() === "") {
    cars = await Car.find({});
  } else {
    cars = await Car.find({
      $text: { $search: search },
    });
  }

  if (cars.length === 0) {
    throw new ApiError(404, "No vehicles found matching the search criteria");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cars, "Vehicles fetched successfully"));
});

export { carListing, getAllCars, search, searchCar };
