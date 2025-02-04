import User from "./model/User.js"
import bcrypt from 'bcrypt'
import dbConnect from "./db.js"
const userRegister = async() =>{
    dbConnect()
    try {
        const hashPassword = await bcrypt.hash("admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch (error) {
        console.log(error);
        
    }
}
userRegister();