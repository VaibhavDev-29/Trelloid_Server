import { body, param } from "express-validator";



const getNoteValidator = () => {
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

const createNoteValidator = () => {
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
        param("noteId")
            .notEmpty()
            .withMessage("Note Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Note ID");
            }

        return true;
        }),
    ]
}

const updateNoteValidator = () => {
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
        param("noteId")
            .notEmpty()
            .withMessage("Note Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Note ID");
            }

        return true;
        }),
    ]
}

const deleteNoteValidator = () => {
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
        param("noteId")
            .notEmpty()
            .withMessage("Note Id must be required")
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("Invalid Note ID");
            }

        return true;
        }),
    ]
}


export {
    getNoteValidator,
    createNoteValidator,
    updateNoteValidator,
    deleteNoteValidator
}