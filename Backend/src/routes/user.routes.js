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
  forgetPassword,
  resetPassword,
} from "../controllers/user.controller.js";
router.route("/signup").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/getUserData").get(getUserData);
router
  .route("/AddUserAvatar")
  .patch(verifyJWT, upload.single("avatar"), AddUserAvatar);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword").post(resetPassword);
export default router;
