import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Car Rental Backend is running 🚀",
  });
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
import userRouter from "./routes/user.routes.js";
import carRouter from "./routes/car.routes.js";
import bookingRouter from "./routes/bookingCar.routes.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/car", carRouter);
app.use("/api/v1/carbooking", bookingRouter);
export default app;
