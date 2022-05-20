import express from "express";
import { forgotPassword, resetPassword } from "../controllers/reset-password.controller";
import { verifyResetPasswordToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", verifyResetPasswordToken, resetPassword);

export default router;
