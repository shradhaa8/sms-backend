import express from 'express'
import cors from 'cors'
import dbConnect from './db.js'
const app = express()
import authRouter from './routes/Auth.js'
import studentRouter from './routes/student.js'
import dashboardRouter from './routes/dashboard.js'



const port = 5000

dbConnect()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/student', studentRouter)
app.use('/api/dashboard', dashboardRouter)
app.listen(port, ()=>{
    console.log(`server on https://localhost:${port}`);
    
})