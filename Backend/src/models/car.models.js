import mongoose, { model, Schema } from "mongoose";

const carSchema = new Schema(
  {
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    year: {
      type: Number,
      required: true,
      min: 2005,
      max: new Date().getFullYear(),
    },
    perDayPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    transmission: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["manual", "semautomatic", "automatic"],
    },
    fuelType: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["cng", "petrol", "diesal", "electric", "hybrid"],
    },
    seatingCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

carSchema.index({
  brand: "text",
  model: "text",
  category: "text",
  transmission: "text",
  fuelType: "text",
  description: "text",
  location: "text",
});

export const Car = model("Car", carSchema);
