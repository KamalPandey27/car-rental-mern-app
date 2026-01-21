import { Router } from "express";

const router = Router();

import { registerUser } from "../controllers/user.controller.js";
router.route("/signup").post(registerUser);
export default router;
