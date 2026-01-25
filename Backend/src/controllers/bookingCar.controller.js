import { asyncHandler } from "../utils/asyncHandler.js";
import { BookingCar } from "../models/booking.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Car } from "../models/car.models.js";
const bookCar = asyncHandler(async (req, res) => {
  const {
    pickupDate,
    returnDate,
    location,
    totalDays,
    totalAmount,
    owner,
    car,
  } = req.body;

  const customer = req.user._id;

  if (
    !pickupDate ||
    !returnDate ||
    !location ||
    !totalDays ||
    !totalAmount ||
    !owner ||
    !car
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const carFind = await Car.findByIdAndUpdate(req.body.car, {
    isAvailable: false,
  });

  if (!carFind) {
    throw new ApiError(404, "Car not found");
  }

  const bookingCar = await BookingCar.create({
    owner,
    customer,
    pickupDate,
    returnDate,
    price: totalAmount,
    car,
    totalDays,
    location,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, bookingCar, "Car booked successfully"));
});

const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await BookingCar.find({
    customer: req.user._id,
  })
    .populate("car")
    .populate({
      path: "customer",
      select: "-password -refreshtoken",
    });

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "Bookings fetched successfully"));
});
export { bookCar, getAllBookings };
