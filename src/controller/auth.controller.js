import User from "../models/user.models.js"
import { ApiError } from "../utils/api-errors.js"
import { ApiResponce } from "../utils/api-response.js"
import { asyncHandler }  from "../utils/async-handler.js" 
import { sendEmail, emailVerificationMailGenContent } from "../utils/mail.js"
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

    const { email, username, password, role } = req.body

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

// reset password


export {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser
}