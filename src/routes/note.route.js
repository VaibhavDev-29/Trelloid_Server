import { Router } from "express";

import {
    createNote,
    updateNote,
    deleteNote,
    getNotes
} from "../controller/note.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { availableUserRoles } from "../utils/constants.js";
import { validateProjectPermission } from "../middleware/auth.middleware.js";

const router = Router()

router.use(verifyJWT)

router
    .route("/:projectId")
    .get(validateProjectPermission(availableUserRoles), getNotes)
    .post(validateProjectPermission(availableUserRoles),
    createNote
)

router
    .route("/:projectId/n/noteId")
    .delete(validateProjectPermission(availableUserRoles), deleteNote)
    .put(validateProjectPermission(availableUserRoles), updateNote)
    

export default router