import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from '../config/db.mjs'
import router from '../routes/index.mjs'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json({ limit: '50mb' })); // Set the limit to 50mb or any value you need
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())
app.use("/api", router)

connectDB();

if (process.env.NODE_ENV !== "production"){
    const PORT = process.env.PORT
    connectDB().then(() => { 
        app.listen(PORT,()=> {
            console.log(`server is running on port ${PORT}`)
        })
    })
}

 export default app; 
 
