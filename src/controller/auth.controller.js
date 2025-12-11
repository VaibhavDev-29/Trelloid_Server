import User from "../models/user.models.js"
import { ApiError } from "../utils/api-errors.js"
import { ApiResponce } from "../utils/api-response.js"
import { asyncHandler }  from "../utils/async-handler.js" 
import { sendEmail, emailVerificationMailGenContent, resetPasswordMailGenContent } from "../utils/mail.js"
import crypto from "crypto"
import bcrypt from "bcrypt"
  

// generate access & refresh token 

const generateAccessRefreshTokens = async (userId) => {
    try {
        
        const user = await User.findById(userId)
        // console.log("here.....",user);
        

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // console.log(".................",accessToken, ".............",refreshToken);
        

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave : false })

        return { accessToken , refreshToken }


    } catch (err) {
        // console.log("TOKEN ERROR:", err);
        throw new ApiError(500,
            "Something went wrong while creating tokens"
        )
    }
}

//  user register controller

const registerUser = asyncHandler( async (req, res) => {

    const { email, username, password, roles } = req.body

     // validate data using express validator
    
    const existedUser = await User.findOne({
        $or : [{ username } , { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User alredy exist with email or username")
    }

    const user = await User.create({
        email,
        password,
        username,
        roles,
        isEmailVerified: false 
    })


    const { unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken()


    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry

    await user.save({ validateBeforeSave : false})

    await sendEmail({
        email: user?.email,
        subject : "Please verify your email",
        mailGenContent : emailVerificationMailGenContent(
            user.username,
            `${req.protocol}://${req.get(
                "host",
            )}/api/v1/auth/verify-email/${unHashedToken}`,
        )
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )

    if (!createdUser) {
        throw new ApiError( 500, "Something went wrong while registering the user")
    }

    return res
        .status(201)
        .json( new ApiResponce(
            200,
            {user : createdUser},
            "User registered succesfully and email verification send on email"
        ))


})

// user login controller

const loginUser = asyncHandler(async (req,res) => {
    // get data 
    const { username, email, password, role} = req.body

    // validate data using express validator
    if (!username || !email) {
        throw new ApiError( 400, "Username or Email is required")
    }

    const user = await User.findOne({
        $or : [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist register yourself first")
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if (!isPassword) {
        throw new ApiError(400, "Incorrect password")
    }

    const {accessToken, refreshToken} = await generateAccessRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry -__v"
    )

    // console.log(loggedInUser);
    

    const cookieOption = {
        httpOnly : true,
        secure : false
    }

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOption)
        .cookie("refreshToken", refreshToken, cookieOption)
        .json(new ApiResponce(200, { user: loggedInUser }, "User logged in successfully"))

})

// user logout controller

const logoutUser = asyncHandler(async (req, res) => {
    // get tokens

    await User.findByIdAndUpdate(
        // console.log("hello"),
        // console.log("_id is ...", req.user._id),
        
        req.user._id,
        {
            $set : {
                refreshToken : ""
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponce(200, {}, "User loged out"))
})

// verify email controller

const verifyEmail = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params

    if (!verificationToken) {
        throw new ApiError(404, "invaild token")
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex")

    const user = await User.findOne({ 
        emailVerificationToken : hashedToken,
        emailVerificationExpiry : { $gt : Date.now() }
     })

    // console.log("user is :",user);

    if (!user) {
        throw new ApiError(489, "Token is invaild or Expired")
    }

    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined

    user.isEmailVerified = true

    await user.save({validateBeforeSave : false})

    return res
        .status(201)
        .json(new ApiResponce(200, { isEmailVerified : true }, "Email-verified succesfully"))
    
})

// forgot password

const forgotPasswordRequest = asyncHandler(async (req, res) => {
    // get email and checks in db 
    const {email} = req.body

    const user = await User.findOne({email})

    if (!user) {
        throw new ApiError(404, "user does not exist.", [])
    }

    // now generate neccecry tokens and save hased token in db

    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken()

    // console.log(unHashedToken, hashedToken, tokenExpiry)

    user.forgotPasswordToken = hashedToken
    user.forgotPasswordExpiry = tokenExpiry
    await user.save({validateBeforeSave : false})

    // console.log(user.forgotPasswordToken);

    // sends a email to user 

    await sendEmail({
        email: user?.email,
        subject : "Password reset request",
        mailGenContent : resetPasswordMailGenContent(
            user.username,
            `${req.protocol}://${req.get(
                "host",
            )}/api/v1/auth/forgot-password/${unHashedToken}`,
        )
    })

    return res
            .status(200)
            .json(
                new ApiResponce(
                    200,
                    {}, 
                    "Password reset mail has been sent to your email."))

    
})    

// reset password

const resetForgottenPassword = asyncHandler(async (req, res) => {

    // get token and new password form user 

    const {resetToken} = req.params
    const {newPassword} = req.body

    // create a hashed version of token 

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

    // find user similar to hashed token 

    const user = await User.findOne({
        forgotPasswordToken : hashedToken,
        forgotPasswordExpiry : {$gt: Date.now()}
    })

    // if not user then handle it

    if (!user) {
        throw new ApiError(489, "Token is invalid or expired")
    }

    // if all ok then set field to undefined // forgotPasswordToken // forgotPasswordExpiry

    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined

    // now update new password in db 

    user.password = newPassword
    await user.save({validateBeforeSave : false})

    return res
        .status(200)
        .json(new ApiResponce(200, {}, "Password reset successfully"))

})

// change current password with the help of old one 

const changeCurrentPassword = asyncHandler(async (req, res) => {
    // get passwords from user 
    const { oldPassword, newPassword } = req.body

    const user = User.findById(req.user?._id)

    // check old password 

    const isPasswordValid = bcrypt.compare(oldPassword, user.password)

    // handle if password not vaild

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid Password")
    }

    // save new password in db

    user.password = newPassword
    user.save({ validateBeforeSave : false })

    return res
        .status(200)
        .json(new ApiResponce(200, {}, "Password change successfully."))
})

// get current user 

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponce(200, req.user, "Current user fetched successfully."))
})

// resendEmailVerification for verify email if not verified for resending again link

const resendEmailVerification = asyncHandler(async (req, res) => {
    // get email
    // console.log(req.body);
     
    const { email } = req.body

    const user = await User.findOne({email})
    // console.log(user);

    if (!user) {
        throw new ApiError(404, "user not found", [])
    }

    if (user.isEmailVerified) {
        throw new ApiError(409, "Email is already verified!")
    }

    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken()

    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry

    await user.save({validateBeforeSave : false})

    await sendEmail({
        email : user?.email,
        subject : "Please verify you email first !",
        mailGenContent : emailVerificationMailGenContent(
            user.username,
            `${req.protocol}://${req.get(
                "host",
            )}/api/v1/auth/verify-email/${unHashedToken}`,
        )
    })
    
    return res
        .status(200)
        .json(new ApiResponce(200, {}, "Mail has been sent to your email id"))
})

// regenerate access token or both tokens after access token expiers  

const refreshAccessToken = asyncHandler(async (req, res) => {

    // get refresh token 

    const { incomingRefreshToken } = req.cookies.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorize request")
    }
    
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken._id)
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken : newRefreshToken } = user.generateAccessRefreshTokens(user._id)

        user.refreshToken = newRefreshToken
        user.save({validateBeforeSave : false})

        return res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",newRefreshToken,options)
            .json(new ApiResponce(
                200,
                "Tokens refreshed successfully"
            ))
    } catch (error) {
        throw new ApiError( 401, error?.message || "Invalid Refresh token")
    }
})

export {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    forgotPasswordRequest,
    resetForgottenPassword,
    changeCurrentPassword,
    getCurrentUser,
    resendEmailVerification,
    refreshAccessToken
}




//   changeCurrentPassword,         DONE
//   forgotPasswordRequest,         DONE
//   getCurrentUser,                DONE
//   loginUser,                     DONE
//   logoutUser,                    DONE
//   refreshAccessToken,            DONE
//   registerUser,                  DONE
//   resendEmailVerification,       DONE
//   resetForgottenPassword,        DONE
//   verifyEmail,                   DONE