import mongoose from "mongoose";
const Mongo_URI ="mongodb+srv://student:student123@studentsclustor.xh6ao.mongodb.net/studentDB?retryWrites=true&w=majority&appName=Studentsclustor"
const dbConnect =()=>{
    mongoose.connect(Mongo_URI)
    .then(()=>{
        console.log("mongodb successfully connected");
        
    })
}
export default dbConnect