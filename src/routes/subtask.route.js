import { Router } from "express";
import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";
import { getSubTask } from "../controller/subtask.controller.js";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";


const router = Router()

router.use(verifyJWT)    // protect all routes for only login user can acces it 

router
    .route("/:projectId/:taskId")
    .get(validateProjectPermission(availableUserRoles), getSubTask)



export default router