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

// update subTask

// delete subTask

// get subTaskById



export {
    getSubTask
}