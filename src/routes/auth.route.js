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
    resendEmailVerification,
    refreshAccessToken} from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { changeCurrentPasswordValidator,
         forgotPasswordValidator,
         resendEmailVerificationValidator, 
         resetForgottenPasswordValidator, 
         userLoginValidator, 
         userRegistrationValidator, 
         verifyEmailValidator 
        } from "../validators/auth-validator.js";
import { validate } from "../middleware/validation.middleware.js";

const router = Router()


// un-Secured routes 

router.post("/register", upload.single("avatar"),userRegistrationValidator(), validate, registerUser)
router.get("/verify-email/:verificationToken", verifyEmailValidator(), validate, verifyEmail)
router.post("/login",userLoginValidator(), validate, loginUser)
router.post("/forgot-password",forgotPasswordValidator(), validate, forgotPasswordRequest)
router.get("/forgot-password/:token",resetForgottenPasswordValidator(), validate, resetForgottenPassword)
router.post("/resend-email",resendEmailVerificationValidator(), validate, resendEmailVerification)
router.get("/refresh-token", refreshAccessToken )


// Secured routes 

router.post("/logout", verifyJWT, logoutUser)
router.get("/current-user", verifyJWT, getCurrentUser)
router.post("/change-password", verifyJWT, changeCurrentPasswordValidator(), validate, changeCurrentPassword)


export default router