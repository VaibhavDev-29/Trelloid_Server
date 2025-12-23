import { Router } from "express";
import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";
import { 
    getTasks,
    deleteTask,
    createTasks
 } from "../controller/task.controller.js";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";
import { upload } from "../middleware/multer.middleware.js";


const router = Router()

router.use(verifyJWT)    // protect all routes for only login user can acces it 

router
    .route("/:projectId")
    .get(validateProjectPermission(availableUserRoles),getTasks)
    .post(
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        upload.array("attachments"),
        createTasks
    )


router
    .route("/:projectId/t/taskId")
    .delete(deleteTask)







export default router