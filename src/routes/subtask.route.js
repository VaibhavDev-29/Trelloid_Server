import { Router } from "express";
import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";
import { createSubTask, deleteSubTask, getSubTask, getSubTaskById, updateSubTask } from "../controller/subtask.controller.js";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";


const router = Router()

router.use(verifyJWT)    // protect all routes for only login user can acces it 

router
    .route("/:projectId/:taskId/subT")
    .get(validateProjectPermission(availableUserRoles), getSubTask)
    .post(validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]), createSubTask)

router
    .route("/:projectId/:taskId/subT/:subTaskId")
    .get(validateProjectPermission(availableUserRoles), getSubTaskById)
    .post(validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]), updateSubTask)
    .delete(validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]), deleteSubTask)

export default router