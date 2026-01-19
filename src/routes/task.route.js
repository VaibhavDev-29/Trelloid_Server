import { Router } from "express";
import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";
import { 
    getTasks,
    deleteTask,
    createTask,
    updateTask,
    getTaskById
 } from "../controller/task.controller.js";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";
import { upload } from "../middleware/multer.middleware.js";
import { 
    createTaskValidator,
    deleteTaskValidator, 
    getTaskByIdValidator, 
    getTasksValidator, 
    updateTaskValidator 
} from "../validators/task-validator.js";
import { validate } from "../middleware/validation.middleware.js";


const router = Router()

router.use(verifyJWT)    // protect all routes for only login user can acces it 

router
    .route("/:projectId")
    .get(validateProjectPermission(availableUserRoles),getTasksValidator(), validate, getTasks)
    .post(
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        upload.array("attachments"),
        createTaskValidator(),
        validate,
        createTask
    )


router
    .route("/:projectId/t/:taskId")
    .delete(
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        deleteTaskValidator(),
        validate,
        deleteTask)
    .put(
        validateProjectPermission(
            [userRoleEnum.ADMIN,userRoleEnum.PROJECT_ADMIN]),
            upload.array("attachments"),
            updateTaskValidator(),
            validate,
            updateTask
    )
    .get(validateProjectPermission(availableUserRoles),getTaskByIdValidator(), validate, getTaskById)







export default router