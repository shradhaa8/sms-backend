import mongoose from "mongoose";
import { Schema } from "mongoose";

const studentSchema = new Schema({
    userId : {type: Schema.Types.ObjectId, ref: "user", required: true},
    s_name :{type: String, required: true},
    email :{type: String, required: true},
    age :{type: Number, required: true},
    course_enrolled :{type: String, required: true},
    date : {type:Date, default: Date.now}

})

const Student = mongoose.model("Student", studentSchema)
export default Student