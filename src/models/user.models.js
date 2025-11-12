import mongoose, {Schema} from "mongoose";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";


const userSchema = new  Schema({
    avatar : {
        type : {
            url : String,
            localPath : String
        },
        default : {
            url : ``,
            localPath : "",
        }
    },
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullName : {
        type : String,
        trim : true,
    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
    isEmailVerified : {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : {
        type : String
    },
    forgotPasswordExpiry : {
        type : Date
    },
    refreshToken : {
        type : String
    },
    emailVerificationToken : {
        type : String
    },
    emailVerificationExpiry : {
        type : Date
    },
    roles : {
        type : String,
        enum : availableUserRoles,
        default : userRoleEnum.MEMBER
    }
}, { timestamps : true })



const User = mongoose.model("User", userSchema)


export default User
