import jwt from 'jsonwebtoken'
import User from '../model/User.js';
const verifyUser= async(req, res, next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(404).json({success: false, error:"Token not provided"})
        }
        const secretKey = process.env.SECRET || 'defaultSecret';
        const decoded = await jwt.verify(token, secretKey)
        if(!decoded){
            return res.status(404).json({success: false, error:"Token not Valid"})
        }

        const user = await User.findById({_id: decoded._id}).select('-password')

        if(!user){
            return res.status(404).json({success: false, error:"User not found"})
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(404).json({success: false, error:"Server Error"})
    }
}
export default verifyUser