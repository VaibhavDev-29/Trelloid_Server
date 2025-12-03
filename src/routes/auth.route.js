import { Router } from "express";
import healthcheck from "../controller/healthcheck.controller.js"
import { 
    registerUser, 
    verifyEmail, 
    loginUser, 
    logoutUser, 
    forgotPasswordRequest, 
    resetForgottenPassword, 
    getCurrentUser,
    changeCurrentPassword,
    resendEmailVerification} from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()


// un-Secured routes 

router.post("/register", registerUser)
router.get("/verify-email/:verificationToken", verifyEmail)
router.post("/login", loginUser)
router.post("/forgot-password", forgotPasswordRequest)
router.get("/forgot-password/:token",resetForgottenPassword)
router.post("/resend-email", resendEmailVerification)


// Secured routes 

router.post("/logout", verifyJWT, logoutUser)
router.get("/current-user", verifyJWT, getCurrentUser)
router.post("/change-password", verifyJWT, changeCurrentPassword)


export default router