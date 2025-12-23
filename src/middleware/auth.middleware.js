import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken"
import  User  from "../models/user.models.js"
import { ApiError } from "../utils/api-errors.js";
import { ApiResponce } from "../utils/api-response.js";
import ProjectMember from "../models/projectmember.models.js";
import mongoose from "mongoose";





export const verifyJWT = asyncHandler(async (req, res, next) => {
    // console.log(".....",req.cookies);
    
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


export const validateProjectPermission = (roles = []) => 
    asyncHandler(async (req, res, next) => {
        const { projectId } = req.params
        // console.log(roles);
        
        if (!projectId) {
            throw new ApiError(400, "Project id missing.")
        }

        const project = await ProjectMember.findOne({
            project : new mongoose.Types.ObjectId(projectId),
            user : new mongoose.Types.ObjectId(req.user._id)
        })

        if (!project) {
            throw new ApiError(404, "Project not found.")
        }
        // console.log(project);
        
        const givenRole = project.role
        // console.log(givenRole);
        req.user.role = givenRole
        
        

        if (!roles.includes(givenRole)) {
            throw new ApiError(403, "Access denied!")
        }

        next()
})


export const validateRoles = (roles = []) => 
    asyncHandler(async (req, res, next) => {
        // console.log(req.user.roles);
        // console.log(roles);
        
        
        if (!roles.includes(req.user.roles)) {
            throw new ApiError(403, "Access denied!")
        }
        next()
    })