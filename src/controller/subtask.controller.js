import Project from "../models/project.model.js"
import Task from "../models/task.models.js"
import SubTask from "../models/subtask.models.js"
import { ApiError } from "../utils/api-errors.js";
import { ApiResponce } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";
import mongoose from "mongoose";
import { assign } from "nodemailer/lib/shared/index.js";
import User from "../models/user.models.js";
import ProjectMember from "../models/projectmember.models.js";


// get subTask

const getSubTask = asyncHandler(async (req, res) => {

    const { projectId, taskId } = req.params

    const filter = {
        task :new mongoose.Types.ObjectId(taskId)
    }

    const ADMIN_ROLES = [userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]

    const task = await Task.findOne({
        _id : new mongoose.Types.ObjectId(taskId),
        project : new mongoose.Types.ObjectId(projectId),
    })

    if (!task) {
        throw new ApiError(404, "Task not found in this project")
    }

    if (!ADMIN_ROLES.includes(req.user.role)) {
        filter.assignedTo = req.user._id
    }

    const subTask = await SubTask.find({
        filter
    }).populate("assignedTo", "username fullName avatar")

    return res
        .status(200)
        .json(new ApiResponce(200, subTask, "subTask fetched successfully"))

})

// create subTask

const createSubTask = asyncHandler(async (req, res) => {

    const { projectId, taskId } = req.params
    const { tittle, discription, assignTo, status } = req.body

    const task = await Task.findOne({
        _id : new mongoose.Types.ObjectId(taskId),
        project : new mongoose.Types.ObjectId(projectId),
    })

    if (!task) {
        throw new ApiError(404, "Task not found in this project")
    }

    if (assignTo) {
            
            if (!mongoose.isValidObjectId(assignTo)) {
                throw new ApiError(400, "Invaild assignTo user id ")
            }
    
            const userExist = await User.findById(assignTo)
    
            if (!userExist) {
                throw new ApiError(400, "Assigned user not found")
            }
    
            const isProjectMember = await ProjectMember.findOne({
                project : projectId,
                user : assignTo
            })
    
            if (!isProjectMember) {
                throw new ApiError(400,"Assigned user is not a member of this project")
            }
        
        }

        const subTask = await SubTask.create({
        tittle,
        discription,
        task : new mongoose.Types.ObjectId(taskId),
        assignedTo : new mongoose.Types.ObjectId(assignTo),
        status,
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
    })

    return res
        .status(200)
        .json(new ApiResponce(201, subTask, "SubTask created successfully"))

})
// update subTask

const updateSubTask = asyncHandler(async (req, res) => {

    const { projectId, taskId, subTaskId } = req.params
    const { tittle, discription, assignTo, status } = req.body

    const task = await Task.findOne({
        _id : new mongoose.Types.ObjectId(taskId),
        project : new mongoose.Types.ObjectId(projectId)
    })

    if (!task) {
        throw new ApiError(404, "Task not found in this project")
    }

    const subTask = await SubTask.findOne({
        _id : new mongoose.Types.ObjectId(subTaskId),
        task : new mongoose.Types.ObjectId(taskId)
    })

    if (!subTask) {
        throw new ApiError(404, "SubTask in not found in this task")
    }

    if (assignTo) {
        if (!mongoose.isValidObjectId(assignTo)) {
            throw new ApiError(400, "invaild assignedTo user id")
        }

        const userExist = await User.findById(assignTo)

        if (!userExist) {
            throw new ApiError(404, "Assigned user not found")
        }

        const isProjectMember = await ProjectMember.findOne({
            project : new mongoose.Types.ObjectId(projectId),
            user : new mongoose.Types.ObjectId(assignTo)
        })

        if (!isProjectMember) {
            throw new ApiError(400, "Assigned user is not a member of this project")
        }
        subTask.assignedBy = new mongoose.Types.ObjectId(req.user._id)
        subTask.assignedTo = new mongoose.Types.ObjectId(assignTo)
    }

    subTask.tittle = tittle
    subTask.discription = discription
    subTask.status = status

    await subTask.save()

    return res
        .status(200)
        .json(new ApiResponce(200, subTask, "SubTask updated successfully"))

})
// delete subTask

const deleteSubTask = asyncHandler(async (req, res) => {
    const { projectId, taskId, subTaskId } = req.params
    const task = await Task.findOne({
        _id : new mongoose.Types.ObjectId(taskId),
        project : new mongoose.Types.ObjectId(projectId)
    })
    
    if (!task) {
        throw new ApiError(404, "Task is not found in this project")
    }

    const subtask = await SubTask.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(subTaskId),
        task : new mongoose.Types.ObjectId(taskId)
    })

    if (!subtask) {
        throw new ApiError(404, "SubTask is not found in this task")
    }

    return res
        .status(200)
        .json(new ApiResponce(200, subtask, "SubTask deleted successfully"))
})
// get subTaskById

const getSubTaskById = asyncHandler(async (req, res) => {

    const { projectId, taskId, subTaskId } = req.params

    const task = await Task.findOne({
        _id : new mongoose.Types.ObjectId(taskId),
        project : new mongoose.Types.ObjectId(projectId)
    })

    if (!task) {
        throw new ApiError(404, "Task not found in this project")
    }

    const subTask = await SubTask.findOne({
        _id : new mongoose.Types.ObjectId(subTaskId),
        task : new mongoose.Types.ObjectId(taskId)
    })
    .populate("assignedTo", "username")


    if (!subTask) {
        throw new ApiError(404, "SubTask in not found in this task")
    }

    return res
        .status(200)
        .json(new ApiResponce(200, subTask, "SubTask fetched successfully"))

})


export {
    getSubTask,
    createSubTask,
    updateSubTask,
    deleteSubTask,
    getSubTaskById
    
}