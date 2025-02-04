import mongoose from "mongoose";

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin","student"],
    required: true
  },
  profileImage: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
}
});
const User = mongoose.model('user',UserSchema)
export default User