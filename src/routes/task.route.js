import { Router } from "express";
import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";
import { 
    getTasks,

 } from "../controller/task.controller.js";


const router = Router()

router.use(verifyJWT)    // protect all routes 

router
    .route("/:projectId")
    .get(getTasks)










export default router