import { body, param } from "express-validator";
import mongoose from "mongoose";

const createProjectValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Project name is required")
            .isLength({ min: 3, max: 100 })
            .withMessage("Project name must be between 3 and 100 characters"),

        body("description")
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage("Description cannot exceed 500 characters"),

        body()
            .custom((_, { req }) => {
                if (!req.user || !req.user._id) {
                    throw new Error("Unauthorized: user not found");
            }

                if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
                    throw new Error("Invalid user ID");
            }

        return true;
        })
    ]
}

const getProjectByIdValidator = () => {
    return [
        param("projectId")
            .notEmpty()
            .withMessage("Project Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Project ID");
            }

        return true;
        })
    ]
}

const deleteProjectValidator = () => {
    return [
        param("projectId")
            .notEmpty()
            .withMessage("Project Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Project ID");
            }

        return true;
        })
    ]
}

const updateProjectValidator = () => {
    return [

        body("name")
            .trim()
            .notEmpty()
            .withMessage("Project name is required")
            .isLength({ min: 3, max: 100 })
            .withMessage("Project name must be between 3 and 100 characters"),

        body("description")
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage("Description cannot exceed 500 characters"),

        param("projectId")
            .notEmpty()
            .withMessage("Project Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Project ID");
            }

        return true;
        })
    ]
}

const addMemberToProjectValidator = () => {
    return [

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
            .withMessage("Username must be between 3 and 16 character"),

        param("projectId")
            .notEmpty()
            .withMessage("Project Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Project ID");
            }
        }),

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


const getProjectMembersValidator = () => {
    return [
       param("projectId")
            .notEmpty()
            .withMessage("Project Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Project ID");
            }

        return true;
        }) 
    ]
}

const updateMemberRoleValidator = () => {
    return [

        param("projectId")
            .notEmpty()
            .withMessage("Project Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Project ID");
            }

        return true;
        }),

        param("userId")
            .notEmpty()
            .withMessage("User Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid User ID");
            }

        return true;
        }),

        body("newRole")
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

const deleteMemberValidator = () => {
    return [
        param("projectId")
            .notEmpty()
            .withMessage("Project Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Project ID");
            }

        return true;
        }),

        param("userId")
            .notEmpty()
            .withMessage("User Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid User ID");
            }

        return true;
        })
    ]
}


export {
    createProjectValidator,
    getProjectByIdValidator,
    deleteProjectValidator,
    updateProjectValidator,
    addMemberToProjectValidator,
    getProjectMembersValidator,
    updateMemberRoleValidator,
    deleteMemberValidator
}