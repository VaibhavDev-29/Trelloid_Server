import { Router } from "express";
import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";
import { 
    getTasks,
    deleteTask
 } from "../controller/task.controller.js";


const router = Router()

router.use(verifyJWT)    // protect all routes 

router
    .route("/:projectId")
    .get(getTasks)


router
    .route("/:projectId/t/taskId")
    .delete(deleteTask)







export default router