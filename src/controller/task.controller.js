import Project from "../models/project.model.js"
import Task from "../models/task.models.js"
import { ApiError } from "../utils/api-errors.js";
import { ApiResponce } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import User from "../models/user.models.js";
import ProjectMember from "../models/projectmember.models.js";


const getTasks = asyncHandler(async (req, res) => {

    const { projectId } = req.params
    const project = await Project.findById(projectId)
    // console.log(project);

    if (!project) {
        throw new ApiError(404, "Project not found.")
    }

    const tasks = await Task.find({
        project : new mongoose.Types.ObjectId(projectId)
    }).populate("assignedTo", "username fullName avatar")
    

    // console.log(tasks);
    

    return res
        .status(200)
        .json(new ApiResponce(200, tasks, "Tasks fetched succesfully!"))
})

const createTask = asyncHandler(async (req, res) => {

    const { tittle, discription, assignTo, status } = req.body
    const { projectId } = req.params
    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(404, "Project not found")
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

    const files = req.files || []

    const attachments = files.map((file) => {
        return {
            url : `${process.env.SERVERURL}/images/${file.filename}`,
            mimetype : file.mimetype,
            size: file.size
        }
    })

    const task = await Task.create({
        tittle,
        discription,
        project : new mongoose.Types.ObjectId(projectId),
        assignedTo : new mongoose.Types.ObjectId(assignTo),
        status,
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
        attachments
    })

    return res
        .status(200)
        .json(new ApiResponce(201, task, "Task created successfully"))
})

const deleteTask = asyncHandler(async (req, res) => {

    const { projectId, taskId } = req.params
    
    const task = await Task.findOneAndDelete({
        _id : new mongoose.Types.ObjectId(taskId),
        project : new mongoose.Types.ObjectId(projectId)
    })

    if (!task) {
        throw new ApiError(404, "task not found in this project.")
    }

    return res
        .status(200)
        .json(new ApiResponce(200, task, "Task deleted Succesfully!"))
})


const updateTask = asyncHandler(async (req, res) => {
    // console.log("hello from uptask");
    

    const { tittle, discription, assignTo, status } = req.body
    const { projectId, taskId } = req.params

    const project = await Project.findById(projectId)
    const task = await Task.findById(taskId)

    if (!project || !task) {
        throw new ApiError(404, "Project or task not found")
    }

    if (task.project.toString() !== projectId) {
        throw new ApiError(400, "Task does not belong to this project")
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

        task.assignedTo = new mongoose.Types.ObjectId(assignTo)
        task.assignedBy = new mongoose.Types.ObjectId(req.user._id)
    }
    
    const files = req.files || []

    const attachments = files.map((file) => {
        return {
            url : `${process.env.SERVERURL}/images/${file.filename}`,
            mimetype : file.mimetype,
            size: file.size
        }
    })
  
    task.tittle = tittle ?? task.tittle
    task.discription = discription ?? task.discription
    task.status = status ?? task.status
    task.attachments = [...(task.attachments || []), ...attachments]
        
    await task.save()

    return res
        .status(200)
        .json(new ApiResponce(200, task, "Task updated successfully"))

})

const getTaskById = asyncHandler(async (req, res) => {

    const { taskId, projectId } = req.params
    const task = await Task.findOne({
        _id : new mongoose.Types.ObjectId(taskId),
        project : new mongoose.Types.ObjectId(projectId)
    })
        .populate("assignedTo", "username fullName avatar")

    if (!task) {
        throw new ApiError(404, "Task not found")
    }

    if (task.project.toString() !== projectId) {
        throw new ApiError(400, "Task does not belong to this project")
    }

    return res
        .status(200)
        .json(new ApiResponce(200, task, "Task fecthed successfully"))

})

export {
    getTasks,
    deleteTask,
    createTask,
    updateTask,
    getTaskById
}
