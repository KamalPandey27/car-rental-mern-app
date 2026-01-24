import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

import {
  getUserData,
  login,
  logout,
  registerUser,
  AddUserAvatar,
  carListing,
} from "../controllers/user.controller.js";
router.route("/signup").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/getUserData").get(getUserData);
router
  .route("/AddUserAvatar")
  .patch(verifyJWT, upload.single("avatar"), AddUserAvatar);
router.route("/carListing").post(verifyJWT, upload.single("image"), carListing);

export default router;
