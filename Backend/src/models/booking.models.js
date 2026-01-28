import mongoose, { Schema, model } from "mongoose";

const bookingCarSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= this.pickupDate;
        },
        message: "Return date must be same day or after pickup date",
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    car: {
      type: mongoose.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
      min: 1,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const BookingCar = model("BookingCar", bookingCarSchema);
