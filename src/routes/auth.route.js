import { Router } from "express";
import healthcheck from "../controller/healthcheck.controller.js"
import { registerUser, verifyEmail, loginUser, logoutUser } from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/register", registerUser)
router.get("/verify-email/:verificationToken", verifyEmail)
router.post("/login", loginUser)
router.post("/logout", verifyJWT, logoutUser)

export default router