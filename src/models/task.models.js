import mongoose, {Schema} from "mongoose";
import { availableTaskStatusEnum, taskStatusEnum } from "../utils/constants.js";


const taskSchema = new  Schema({
    tittle : {
        type : String,
        required : true,
        trim : true,
    },
    discription : {
        type : String,
        trim : true,
    },
    project : {
        type : Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },
    assignedTo : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    assignedBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type : String,
        enum : availableTaskStatusEnum,
        default : taskStatusEnum.TODO
    },
    attachments : {
        type : [{
            url : String,
            memetype : String,
            size : Number
        }],
        default : []
    }
}, { timestamps : true })



const Task = mongoose.model("Task", taskSchema)


export default Task
