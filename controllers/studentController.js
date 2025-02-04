import multer from "multer";
import Student from "../model/Student.js";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import path from "path"; 
import { error } from "console";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

const addStudent = async (req, res) => {
  try {
   
    const { s_name, email, age, course_enrolled, password } = req.body; 

   
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered" });
    }

   
    if (!password) {
      return res
        .status(400)
        .json({ success: false, error: "Password is required" });
    }

    
    const hashPassword = await bcrypt.hash(password, 10); 

    
    const newUser = new User({
      name: s_name, 
      email,
      password: hashPassword,
      role: "student", 
      profileImage: req.file ? req.file.filename : "",
    });

    
    const savedUser = await newUser.save();

   
    const newStudent = new Student({
      userId: savedUser._id,
      s_name,
      email,
      age,
      course_enrolled,
    });

  
    await newStudent.save();

    
    return res.status(200).json({ success: true, message: "Student Created" });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("userId", { password: 0 });
    return res.status(200).json({ success: true, students });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

const getStudent = async (req, res) => {
  const {id} = req.params
    try {
     let student = await Student.findById({_id: id}).populate("userId", { password: 0 });
      if (!student) {
      student = await Student.findOne({ userId: id }).populate("userId", { password: 0 });
    }
    if (student) {
      return res.status(200).json({ success: true, student });
    } else {
      return res.status(404).json({ success: false, error: "Student not found" });
    }
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

const updateStudent = async(req, res) =>{
  try {
    const {id} = req.params
    const{
      s_name,
      email,
      age,
      course_enrolled,
    } = req.body

    const student = await Student.findById({_id: id})
    if(!student){
      return res.status(404).json({ success: false, error: "Student not found"})
    }

    const user = await User.findById({_id: student.userId})
    if(!user){
      return res.status(404).json({ success: false, error: "User not found"})
    }

    const updateUser = await User.findByIdAndUpdate({_id: student.userId}, {s_name})
    const updateStudent = await Student.findByIdAndUpdate({_id: id},{
      email,
      age,
      course_enrolled
    })
    if(!updateStudent || !updateUser){
      return res.status(404).json({ success: false, error: "Details Not Found" });
    }

    return res.status(200).json({ success: true, error: "Student Details Updated" });

  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
}

const deleteStudent = async (req, res) =>{
  try {
    const {id} = req.params
    const deletestd = await Student.findByIdAndDelete({_id: id})
    return res.status(200).json({ success: true, deletestd });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }

}

export { addStudent, upload, getStudents, getStudent, updateStudent, deleteStudent };
