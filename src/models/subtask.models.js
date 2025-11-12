import mongoose, {Schema} from "mongoose";
import { availableTaskStatusEnum, taskStatusEnum } from "../utils/constants.js";


const subTaskSchema = new  Schema({
    tittle : {
        type : String,
        required : true,
        trim : true,
    },
    discription : {
        type : String,
        trim : true,
    },
    task : {
        type : Schema.Types.ObjectId,
        ref : "Task",
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
    isCompleted : {
        type : Boolean,
        default : false
    }
}, { timestamps : true })



const SubTask = mongoose.model("SubTask", subTaskSchema)


export default SubTask
