import mongoose from "mongoose";
const Mongo_URI ="mongodb+srv://shradhaarajbhandari:1234sass@studentcluster.yks3g.mongodb.net/studentDB?retryWrites=true&w=majority&appName=studentcluster"
const dbConnect =()=>{
    mongoose.connect(Mongo_URI)
    .then(()=>{
        console.log("mongodb successfully connected");
        
    })
}
export default dbConnect