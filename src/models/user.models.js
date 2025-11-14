import mongoose, {Schema} from "mongoose";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";
import Jwt from "jsonwebtoken";
import crypto from "crypto"
import bcrypt from "bcrypt"


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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})


userSchema.methods.generateAccessToken = function () {
    return Jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username
        },
        process.env.ACCESS_TOKEN_SECRETE,
        {
            expiresIn : process.env.ACCESSTOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function () {
    return Jwt.sign(
        {
            _id : this._id,

        },
        process.env.REFRESH_TOKEN_SECRETE,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateTemporaryToken = function () {
    // this will send to user via email for verification 
    const unHashedToken = crypto.randomBytes(20).toString("hex")

    // this will store in db and used while compareing when user verifiy its email
    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")
    
    // token expiry time ( 20 min )

    const tokenExpiry = Date.now() + ( 20 * 60 * 1000)

    return { unHashedToken, hashedToken, tokenExpiry}

}



const User = mongoose.model("User", userSchema)


export default User
