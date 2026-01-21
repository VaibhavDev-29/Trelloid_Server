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
import {
    getNoteValidator,
    createNoteValidator,
    updateNoteValidator,
    deleteNoteValidator
} from "../validators/note-validator.js"
import {validate} from "../middleware/validation.middleware.js"

const router = Router()

router.use(verifyJWT)

router
    .route("/:projectId")
    .get(validateProjectPermission(availableUserRoles),getNoteValidator(), validate, getNotes)
    .post(validateProjectPermission(availableUserRoles),createNoteValidator(), validate, createNote)

router
    .route("/:projectId/n/noteId")
    .delete(validateProjectPermission(availableUserRoles),deleteNoteValidator(), validate, deleteNote)
    .put(validateProjectPermission(availableUserRoles),updateNoteValidator(), validate, updateNote)
    

export default router