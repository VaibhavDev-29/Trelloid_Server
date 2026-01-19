import { body, param } from "express-validator";


const getSubTaskValidator = () => {
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


const createSubTaskValidator = () => {
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



const updateSubTaskValidator = () => {
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

        param("subTaskId")
            .notEmpty()
            .withMessage("Sub-Task Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Sub-Task ID");
            }

        return true;
        }),
    ]
}


const deleteSubTaskValidator = () => {
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

        param("subTaskId")
            .notEmpty()
            .withMessage("Sub-Task Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Sub-Task ID");
            }

        return true;
        }),
    ]
}


const getSubTaskByIdValidator = () => {
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

        param("subTaskId")
            .notEmpty()
            .withMessage("Sub-Task Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Sub-Task ID");
            }

        return true;
        }),
    ]
}


export {
    getSubTaskByIdValidator,
    getSubTaskValidator,
    deleteSubTaskValidator,
    createSubTaskValidator,
    updateSubTaskValidator
}