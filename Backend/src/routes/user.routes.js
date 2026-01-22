import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

import {
  getUserData,
  login,
  logout,
  registerUser,
} from "../controllers/user.controller.js";
router.route("/signup").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/getUserData").get(getUserData);
export default router;
