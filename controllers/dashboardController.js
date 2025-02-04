import Student from "../model/Student.js"


const getDetail = async (req, res) =>{
    try {
        const totalStudents = await Student.countDocuments()
        return res.status(200).json({
            success: true,
            totalStudents
        })
    }catch(error){
        return res.status(500).json({success: false, error:"dashboard detail error"})
    }
}

export {getDetail}