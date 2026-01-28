import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

import {
  getCoustomerBookings,
  bookCar,
  ownerBookingCar,
  CarStatus,
} from "../controllers/bookingCar.controller.js";

router.route("/bookCar").post(verifyJWT, upload.none(), bookCar);
router.route("/getCoustomerBookings").get(verifyJWT, getCoustomerBookings);
router.route("/ownerBookingCar").get(verifyJWT, ownerBookingCar);
router.route("/CarStatus").post(verifyJWT, CarStatus);
export default router;
