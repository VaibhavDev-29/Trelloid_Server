import mongoose, {Schema} from "mongoose";

const noteScheme = new Schema({
    project : {
        type : Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    content : {
        type : String,
        trim : true,
        required : true
    }
}, { timestamps : true })


const Note = mongoose.model("Note", noteScheme)

export default Note