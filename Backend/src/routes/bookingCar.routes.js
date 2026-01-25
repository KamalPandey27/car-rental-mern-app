import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

import { bookCar } from "../controllers/bookingCar.controller.js";
import { getAllBookings } from "../controllers/bookingCar.controller.js";

router.route("/bookCar").post(verifyJWT, upload.none(), bookCar);
router.route("/getAllBookings").get(verifyJWT, getAllBookings);


export default router;
