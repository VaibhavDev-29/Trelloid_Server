import mongoose, {Schema} from "mongoose";
import { availableTaskStatusEnum, taskStatusEnum } from "../utils/constants.js";

const projectSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type : String,
        enum : availableTaskStatusEnum,
        default : taskStatusEnum.TODO
    }
}, { timestamps : true })

const Project = mongoose.model("Project", projectSchema)

export default Project