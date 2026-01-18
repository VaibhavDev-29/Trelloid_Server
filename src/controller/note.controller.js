import Project from "../models/project.model.js"
import { ApiError } from "../utils/api-errors.js";
import { ApiResponce } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import User from "../models/user.models.js";
import ProjectMember from "../models/projectmember.models.js";
import Note from "../models/note.models.js";

// get notes 

// create note

const createNote = asyncHandler(async (req, res) => {

    const { projectId } = req.params
    const { content } = req.body

    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(404, "Project not found")
    }

    const note = await Note.create({
        project : new mongoose.Types.ObjectId(projectId),
        content,
        createdBy : new mongoose.Types.ObjectId(req.user._id)
    })

    return res
        .status(200)
        .json(new ApiResponce(200, note, "Note created successfully"))
})
// update note

// delete note