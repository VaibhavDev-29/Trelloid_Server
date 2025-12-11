import { Router } from "express";
import { validateProjectPermission, validateRoles, verifyJWT } from "../middleware/auth.middleware.js";
import 
{   
    addMemberToProject,
    createProject,
    deleteProject,
    getAllMyProjects,
    getProjectById,
    updateMemberRole,
    updateProject,
    deleteMember
    
} from "../controller/project.controller.js";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";



const router = Router()

// this line can secured all routes 

router.use(verifyJWT)

router
    .route("/")
    .get(getAllMyProjects)
    .post(validateRoles(userRoleEnum.ADMIN),createProject)

router
    .route("/:projectId")
    .get(validateProjectPermission(availableUserRoles), getProjectById)
    .put(validateProjectPermission([userRoleEnum.ADMIN]), updateProject)
    .delete(validateProjectPermission([userRoleEnum.ADMIN]), deleteProject)
    
router
    .route("/:projectId/member")
    .post(validateProjectPermission([ userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]), addMemberToProject)

router
    .route("/:projectId/member/:userId")
    .put(validateProjectPermission([ userRoleEnum.ADMIN ]), updateMemberRole)
    .delete(validateProjectPermission([ userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN ]), deleteMember)



export default router

