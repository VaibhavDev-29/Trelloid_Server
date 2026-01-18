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
    deleteMember,
    getProjectMembers
    
} from "../controller/project.controller.js";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";
import { 
         addMemberToProjectValidator,
         createProjectValidator,
         deleteMemberValidator, 
         deleteProjectValidator, 
         getProjectByIdValidator, 
         getProjectMembersValidator, 
         updateMemberRoleValidator, 
         updateProjectValidator
         
 } from "../validators/project-validator.js";
 import { validate } from "../middleware/validation.middleware.js";



const router = Router()

// this line can secured all routes 

router.use(verifyJWT)

router
    .route("/")
    .get(getAllMyProjects)
    .post(validateRoles(userRoleEnum.ADMIN),createProjectValidator(), validate, createProject)

router
    .route("/:projectId")
    .get(validateProjectPermission(availableUserRoles),getProjectByIdValidator(), validate, getProjectById)
    .put(validateProjectPermission([userRoleEnum.ADMIN]),updateProjectValidator(), validate, updateProject)
    .delete(validateProjectPermission([userRoleEnum.ADMIN]),deleteProjectValidator(), validate, deleteProject)
    
router
    .route("/:projectId/member")
    .get(getProjectMembersValidator(), validate, getProjectMembers)
    .post(validateProjectPermission([ userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),addMemberToProjectValidator(), validate, addMemberToProject)

router
    .route("/:projectId/member/:userId")
    .put(validateProjectPermission([ userRoleEnum.ADMIN ]),updateMemberRoleValidator(), validate, updateMemberRole)
    .delete(validateProjectPermission([ userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN ]),deleteMemberValidator(), validate, deleteMember)



export default router

