import { asyncHandler } from "../utils/asyncHandler.js";
import { BookingCar } from "../models/booking.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Car } from "../models/car.models.js";
import { sendEmail } from "../utils/sendMail.js";
const bookCar = asyncHandler(async (req, res) => {
  const {
    pickupDate,
    returnDate,
    location,
    totalDays,
    totalAmount,
    owner,
    car,
    paymentMethod,
  } = req.body;

  const customer = req.user._id;

  if (
    !pickupDate ||
    !returnDate ||
    !location ||
    !totalDays ||
    !totalAmount ||
    !owner ||
    !car ||
    !paymentMethod
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
    paymentMethod,
  });

  const bookingData = await BookingCar.findById(bookingCar._id)
    .populate("owner", "email username")
    .populate("customer", "email username")
    .populate("car", "brand model");

  if (!bookingData) {
    throw new ApiError(404, "Booking not found");
  }

  await sendEmail({
    to: bookingData.owner.email,
    subject: "New Car Booking Request",
    html: `
    <h2>🚗 Your car has been booked!</h2>
    <p><strong>Customer:</strong> ${bookingData.customer.username}</p>
    <p><strong>Car:</strong> ${bookingData.car.brand} ${bookingData.car.model}</p>
    <p><strong>Booking Price:</strong> $${bookingData.price}</p>
    <p><strong>Total Days:</strong> ${bookingData.totalDays}</p>
    <p><strong>Pickup Location:</strong> ${bookingData.location}</p>
    <p><strong>Payment Mode :</strong> ${bookingData.paymentMethod.toLocaleUpperCase()} </p>
    <p>Please log in to your dashboard to confirm or cancel this booking.</p>
  `,
  });

  await sendEmail({
    to: bookingData.customer.email,
    subject: "Booking Request Submitted",
    html: `
    <h2>✅ Booking Request Submitted</h2>
    <p>Your booking request has been successfully submitted.</p>
    <p>The car owner will review and confirm your request shortly.</p>
    <p>Thank you for using our service 🚀</p>
  `,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, bookingCar, "Car booked successfully"));
});

const getCoustomerBookings = asyncHandler(async (req, res) => {
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

const ownerBookingCar = asyncHandler(async (req, res) => {
  const user = req.user._id;

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  const ListedCars = await BookingCar.find({ owner: user })
    .populate("car")
    .populate({
      path: "customer",
      select: "-password -refreshtoken",
    });
  if (!ListedCars) {
    throw new ApiError(404, "car not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, ListedCars, "Car find successfully"));
});

const CarStatus = asyncHandler(async (req, res) => {
  const { carId, status } = req.body;

  if (!carId || !status) {
    throw new ApiError(400, "Give details");
  }
  const booking = await BookingCar.findByIdAndUpdate(
    carId,
    { status },
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("customer", "email username")
    .populate("car", "brand model")
    .populate("owner", "email username");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  await sendEmail({
    to: booking.customer.email,
    subject: "Booking Status Update",
    html: `
    <h2>📢 Booking Status Updated</h2>
    <p>Hello <strong>${booking.customer.username}</strong>,</p>
    <p>Your booking for <strong>${booking.car.brand} ${booking.car.model}</strong> 
    has been <strong>${status}</strong>.</p>
    <p>Thank you for using our service 🚗</p>
  `,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Car status updated successfully"));
});
export { bookCar, getCoustomerBookings, ownerBookingCar, CarStatus };
