import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

import {
  carListing,
  getAllCars,
  search,
  searchCar,
  updateCarDetails,
  unlist,
} from "../controllers/car.controller.js";

router.route("/getAllCars").get(getAllCars);
router.route("/search").post(search);
router.route("/searchCar").post(searchCar);
router.route("/carListing").post(verifyJWT, upload.single("image"), carListing);
router.route("/updateCarDetails").patch(verifyJWT, updateCarDetails);
router.route("/unlist").patch(verifyJWT, unlist);
export default router;
