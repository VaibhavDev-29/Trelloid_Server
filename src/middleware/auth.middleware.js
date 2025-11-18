import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken"
import  User  from "../models/user.models.js"
import { ApiError } from "../utils/api-errors.js";
import { ApiResponce } from "../utils/api-response.js";





export const verifyJWT = asyncHandler(async (req, res, next) => {
    console.log(".....",req.cookies);
    
    const accessToken = 
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "")

    if (!accessToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
        )

        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }

        req.user = user
        next()
    } catch (err) {
        throw new ApiError(401, err?.message || "Invalid access token.")
    }
})