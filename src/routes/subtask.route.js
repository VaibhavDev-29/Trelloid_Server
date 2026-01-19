import { Router } from "express";
import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";
import { createSubTask, deleteSubTask, getSubTask, getSubTaskById, updateSubTask } from "../controller/subtask.controller.js";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";
import { createSubTaskValidator, deleteSubTaskValidator, getSubTaskByIdValidator, getSubTaskValidator, updateSubTaskValidator
         
 } from "../validators/subtask-validator.js";

import { validate } from "../middleware/validation.middleware.js";


const router = Router()

router.use(verifyJWT)    // protect all routes for only login user can acces it 

router
    .route("/:projectId/:taskId/subT")
    .get(validateProjectPermission(availableUserRoles),getSubTaskValidator(), validate, getSubTask)
    .post(validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),createSubTaskValidator(), validate, createSubTask)

router
    .route("/:projectId/:taskId/subT/:subTaskId")
    .get(validateProjectPermission(availableUserRoles),getSubTaskByIdValidator(), validate, getSubTaskById)
    .post(validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),updateSubTaskValidator(), validate, updateSubTask)
    .delete(validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),deleteSubTaskValidator(), validate, deleteSubTask)

export default router