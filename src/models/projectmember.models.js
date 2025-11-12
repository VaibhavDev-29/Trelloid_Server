import mongoose, {Schema} from "mongoose";
import { availableUserRoles, userRoleEnum } from "../utils/constants.js";

const projectMemberSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    project : {
        type : Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },
    role : {
        type : String,
        enum : availableUserRoles,
        default : userRoleEnum.MEMBER
    }
}, { timestamps : true })

const ProjectMember = mongoose.model("ProjectMember", projectMemberSchema)

export default ProjectMember