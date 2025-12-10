import User from "../models/user.models.js";
import Project from "../models/project.model.js"
import ProjectMember from "../models/projectmember.models.js";
import { ApiError } from "../utils/api-errors.js";
import { ApiResponce } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";
import mongoose from "mongoose";




// get all projects of currently logged in user 
const getAllMyProjects = asyncHandler(async (req, res) => {

    const userId = new mongoose.Types.ObjectId(req.user._id)

    const projects = await ProjectMember.aggregate([
        {
            $match: {
                user : userId
            }
        }
    ])

    console.log("this is al my projects",projects);
    
    return res
        .status(200)
        .json(new ApiResponce(200,projects,"project fetched succesfully!"))
})

// get single Project (info) by id 
const getProjectById = asyncHandler(async (req,res) => {

    const { projectId } = req.params

    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(404, "Project not Found")
    }

    return res
        .status(200)
        .json(new ApiResponce(200, project, "Project Fetched Succesfully!"))

})

// create project by admin

const createProject = asyncHandler(async (req, res) => {

    const { name, description } = req.body
    const  userId  = req.user._id

    const project = await Project.create({
        name,
        description,
        createdBy : new mongoose.Types.ObjectId(userId)
    })

    await ProjectMember.create({
        project: new mongoose.Types.ObjectId(project._id),
        user : new mongoose.Types.ObjectId(userId),
        role : userRoleEnum.ADMIN
    })

    return res
        .status(201)
        .json(new ApiResponce(201,project ,"Project Created Succesfully!"))
})

// update project by admin 

const updateProject = asyncHandler(async (req, res) => {

    const { name, description } = req.body
    const { projectId } = req.params

    const project = await Project.findByIdAndUpdate(
        projectId, {
            name,
            description
    },
    {new : true}
)

if (!project) {
    throw new ApiError(404, "project not found")
}

return res
    .status(200)
    .json(new ApiResponce(200, project, "project updated succesfully!"))


})

// delete a single project 

const deleteProject = asyncHandler(async (req, res) => {

    const { projectId } = req.params

    const project = await Project.findByIdAndDelete(projectId)

    if (!project) {
        throw new ApiError(404, "Project not found.")
    }

    return res
        .status(200)
        .json(new ApiResponce(200, project, "Project deleted Succesfully."))
})

// add member to existing project 

const addMemberToProject = asyncHandler(async (req, res) => {

    const { email, username, role } = req.body
    const { projectId } = req.params

    if (!availableUserRoles.includes(role)) {
        throw new ApiError(400, "Invalid role")
    }

    const user = await User.findOne({
        $or : [{email}, {username}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist.")
    }

    await ProjectMember.findOneAndUpdate(
        {
            user : new mongoose.Types.ObjectId(user._id),
            project : new mongoose.Types.ObjectId(projectId)
        },
        {
            user : new mongoose.Types.ObjectId(user._id),
            project : new mongoose.Types.ObjectId(projectId),
            role : role
        },
        {
            upsert : true,
            new : true
        }

    )

    return res
        .status(200)
        .json(new ApiResponce(200,{}, "Project member added succesfully."))
})

// get all project member 

// const getProjectMember = asyncHandler(async (req, res) => {

// })

// update member role 

const updateMemberRole = asyncHandler(async (req, res) => {
    
    const { projectId, userId } = req.params
    const { newRole } = req.body

    if (!availableUserRoles.includes(newRole)) {
        throw new ApiError(400, "Invalid role")
    }

    let projectMember = await ProjectMember.findOne({
        user: new mongoose.Types.ObjectId(userId),
        project: new mongoose.Types.ObjectId(projectId)
    })

    if (!projectMember) {
        throw new ApiError(404, "Project member not found.")
    }

    projectMember = await ProjectMember.findByIdAndUpdate(
        projectMember._id,
        {
            role : newRole
        },
        {new : true}
    )

    if (!projectMember) {
        throw new ApiError(404, "Project member not found.")
    }

    return res
        .status(200)
        .json(
            new ApiResponce(
            200,
            projectMember,
            "Project member role updated succesfully."
        ))
})

// delete member from a project

const deleteMember = asyncHandler(async (req, res) => {

    const { projectId, userId } = req.params

    let projectMember = await ProjectMember.findOne({
        user : new mongoose.Types.ObjectId(userId),
        project : new mongoose.Types.ObjectId(projectId)
    })

    if (!projectMember) {
        throw new ApiError(404, "Project member not found.")
    }

    projectMember = await ProjectMember.findByIdAndDelete(projectMember._id)

     if (!projectMember) {
        throw new ApiError(404, "Project member not found.")
    }

    return res
        .status(200)
        .json(new ApiResponce(
            200,
            projectMember,
            "Project member deleted succesfully."
        ))
})

export {
    getAllMyProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addMemberToProject,
    updateMemberRole,
    deleteMember,

}