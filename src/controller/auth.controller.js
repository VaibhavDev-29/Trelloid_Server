import User from "../models/user.models.js"
import { ApiError } from "../utils/api-errors.js"
import { ApiResponce } from "../utils/api-response.js"
import { asyncHandler }  from "../utils/async-handler.js" 
import { sendEmail, emailVerificationMailGenContent } from "../utils/mail.js"
  

// generate access & refresh token 

import { access } from "fs"

const generateAccessRefreshTokens = async (userId) => {
    try {
        
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave : false })

        return { accessToken , refreshToken }


    } catch (err) {
        throw new ApiError(500,
            "Something went wrong while creating tokens"
        )
    }
}

//  user register controller

const registerUser = asyncHandler( async (req, res) => {

    const { email, username, password, role } = req.body
    
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
            )}/api/v1/users/verify-email/${unHashedToken}`,
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

// user logout controller

// verify email controller

// forgot password

// reset password


export {
    registerUser
}