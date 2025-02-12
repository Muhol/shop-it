import mongoose from 'mongoose'

async function connectDB (){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to db")
    } catch (err) {
        console.log("erreooo..mdb", err.message)
    }
}

export default connectDB