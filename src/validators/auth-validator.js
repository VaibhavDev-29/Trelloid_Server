import { body, param } from "express-validator";
import { availableUserRoles } from "../utils/constants.js";

const userRegistrationValidator = () => {
    return [
        // email
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format")
            .normalizeEmail(),
        // username
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLength({min: 3, max: 16})
            .withMessage("Username must be between 3 and 16 character")
            .matches(/^[a-zA-Z0-9_]+$/)
            .withMessage("Username can conatins only letters, numbers, and undersocres"),
        // password
        body("password")
            .notEmpty()
            .withMessage("Passwords can not be empty")
            .isLength({min:8, max: 20})
            .withMessage("Password must be atleast 8 characters")
            .matches(/[A-Z]/)
            .withMessage("Password must contain atlest one uppercase letter")
            .matches(/[a-z]/)
            .withMessage("Password must contain atlest one lowercase letter")
            .matches(/[0-9]/)
            .withMessage("Password must contain atlest one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage("Password must contain atlest one special letter"),

        // roles validation  
        body("roles")
            .optional()
            .isArray()
            .withMessage("Roles must be an arryay")
            .custom((roles) => {
                allowedRoles = availableUserRoles
                const isValid = roles.every(role => allowedRoles.include(role))
                if (!isValid) {
                    throw new Error("Invalid role provided")
                }
                return true
            })

    ]
}

const userLoginValidator = () => {
    return [
        // email
        body("email")
            .trim()
            .optional()
            .isEmail()
            .withMessage("Invalid email format")
            .normalizeEmail(),
        // username
        body("username")
            .trim()
            .optional()
            .isLength({min: 3, max: 16})
            .withMessage("Username must be between 3 and 16 character"),
            
        // password
        body("password")
            .notEmpty()
            .withMessage("Passwords can not be empty")
            .isLength({min:8, max: 20})
            .withMessage("Password must be atleast 8 characters"),

        body()
            .custom((_, { req }) => {
                if (!req.body.email && !req.body.username) {
                throw new Error("Email or username is required");
            }
            return true;
            }),

        body()
            .custom((_, { req }) => {
                if (req.body.email && req.body.username) {
                throw new Error("Use either email or username, not both");
            }
            return true;
        })
    ]
}

const verifyEmailValidator = () => {
  return [
    param("verificationToken")
      .notEmpty()
      .withMessage("Verification token is required")
      .isString()
      .withMessage("Verification token must be a string")
      .isLength({ min: 20, max: 512 })
      .withMessage("Invalid verification token format")
  ];
};

const forgotPasswordValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format")
            .normalizeEmail(),
    ]
}

const resetForgottenPasswordValidator = () => {
    return [
        body("newPassword")
            .notEmpty()
            .withMessage("Passwords can not be empty")
            .isLength({min:8, max: 20})
            .withMessage("Password must be atleast 8 characters")
            .matches(/[A-Z]/)
            .withMessage("Password must contain atlest one uppercase letter")
            .matches(/[a-z]/)
            .withMessage("Password must contain atlest one lowercase letter")
            .matches(/[0-9]/)
            .withMessage("Password must contain atlest one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage("Password must contain atlest one special letter"),

        param("resetToken")
            .notEmpty()
            .withMessage("reset token is required")
            .isString()
            .withMessage("reset token must be a string")
            .isLength({ min: 20, max: 30 })
            .withMessage("Invalid reset token format")
    ]
}

const changeCurrentPasswordValidator = () => {
    return [
        body("newPassword")
            .notEmpty()
            .withMessage("Passwords can not be empty")
            .isLength({min:8, max: 20})
            .withMessage("Password must be atleast 8 characters")
            .matches(/[A-Z]/)
            .withMessage("Password must contain atlest one uppercase letter")
            .matches(/[a-z]/)
            .withMessage("Password must contain atlest one lowercase letter")
            .matches(/[0-9]/)
            .withMessage("Password must contain atlest one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage("Password must contain atlest one special letter"),

        body("oldPassword")
            .notEmpty()
            .withMessage("Passwords can not be empty")
            .isLength({min:8, max: 20})
            .withMessage("Password must be atleast 8 characters")
            .matches(/[A-Z]/)
            .withMessage("Password must contain atlest one uppercase letter")
            .matches(/[a-z]/)
            .withMessage("Password must contain atlest one lowercase letter")
            .matches(/[0-9]/)
            .withMessage("Password must contain atlest one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage("Password must contain atlest one special letter"),
    ]
}

const resendEmailVerificationValidator = () => {
    return [
        body("email")
            .trim()
            .optional()
            .isEmail()
            .withMessage("Invalid email format")
            .normalizeEmail(),
    ]
}

export {
    userRegistrationValidator,
    userLoginValidator,
    verifyEmailValidator,
    forgotPasswordValidator,
    resetForgottenPasswordValidator,
    changeCurrentPasswordValidator,
    resendEmailVerificationValidator
}