import { Router } from "express";
import healthcheck from "../controller/healthcheck.controller.js"
import { registerUser, verifyEmail, loginUser } from "../controller/auth.controller.js";

const router = Router()

router.post("/register", registerUser)
router.get("/verify-email/:verificationToken", verifyEmail)
router.post("/login", loginUser)

export default router