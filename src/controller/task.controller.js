import Project from "../models/project.model.js"
import Task from "../models/task.models.js"
import SubTask from "../models/subtask.models.js"
import { ApiError } from "../utils/api-errors.js";
import { ApiResponce } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";
import mongoose from "mongoose";
import { assign } from "nodemailer/lib/shared/index.js";


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
    

    console.log(tasks);
    

    return res
        .status(200)
        .json(new ApiResponce(200, tasks, "Tasks fetched succesfully!"))
})








export {
    getTasks
}