import { body, param } from "express-validator";
import { availableTaskStatusEnum } from "../utils/constants";

const getTasksValidator = () => {
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
    ]
}

const createTaskValidator = () => {
    return [

        body("title")
            .trim()
            .notEmpty()
            .withMessage("Task title is required")
            .isLength({ min: 3, max: 100 })
            .withMessage("Task title must be between 3 and 100 characters"),

        body("description")
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage("Description cannot exceed 500 characters"),

        body("assignTo")
            .notEmpty()
            .withMessage("Task must be assigned to a user")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid assigned user ID");
            }
        return true;
        }),

        body("status")
            .optional()
            .isIn(availableTaskStatusEnum)
            .withMessage("Invalid task status"),
        
        param("projectId")
            .notEmpty()
            .withMessage("Project Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Project ID");
            }

        return true;
        }),
    ]
}


const deleteTaskValidator = () => {
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

        param("taskId")
            .notEmpty()
            .withMessage("Task Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Task ID");
            }

        return true;
        }),
    ]
}


const getTaskByIdValidator = () => {
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

        param("taskId")
            .notEmpty()
            .withMessage("Task Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Task ID");
            }

        return true;
        }),
    ]
}

const updateTaskValidator = () => {
    return [

        body("title")
            .trim()
            .notEmpty()
            .withMessage("Task title is required")
            .isLength({ min: 3, max: 100 })
            .withMessage("Task title must be between 3 and 100 characters"),

        body("description")
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage("Description cannot exceed 500 characters"),

        body("assignTo")
            .notEmpty()
            .withMessage("Task must be assigned to a user")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid assigned user ID");
            }
        return true;
        }),

        body("status")
            .optional()
            .isIn(availableTaskStatusEnum)
            .withMessage("Invalid task status"),

        param("projectId")
            .notEmpty()
            .withMessage("Project Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Project ID");
            }

        return true;
        }),

        param("taskId")
            .notEmpty()
            .withMessage("Task Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Task ID");
            }

        return true;
        }),
    ]
}

