import Project from "../models/project.model.js"
import { ApiError } from "../utils/api-errors.js";
import { ApiResponce } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import User from "../models/user.models.js";
import ProjectMember from "../models/projectmember.models.js";
import Note from "../models/note.models.js";

// get notes 

const getNotes = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    const project = await Project.findById(projectId)
    if (!project) {
        throw new ApiError(404, "Project not found")
    }

    const note = await Note.find({
        project : new mongoose.Types.ObjectId(projectId)
    })

    return res
        .status(200)
        .json(new ApiResponce(200, note, "Notes fetched successfully"))
})

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

const updateNote = asyncHandler(async (req, res) => {
    const { projectId, noteId } = req.params
    const { content } = req.body

    const note = await Note.findOneAndUpdate({
        _id : new mongoose.Types.ObjectId(noteId),
        projectId : new mongoose.Types.ObjectId(projectId)
    },{
        content
    },{
        new : true
    })

    if (!note) {
        throw new ApiError(404, "Note not found")
    }

    return res
        .status(200)
        .json(new ApiResponce(200, note, "Note updated successfully"))
})


// delete note

const deleteNote = asyncHandler(async (req, res) => {
    const { projectId, noteId } = req.params

    const note = await Note.findOneAndDelete({
        _id : new mongoose.Types.ObjectId(noteId),
        projectId : new mongoose.Types.ObjectId(projectId)
    })

    if (!note) {
        throw new ApiError(404, "Note not found")
    }

    return res
        .status(200)
        .json(new ApiResponce(200, note, "Note deleted successfully"))
})


export {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}