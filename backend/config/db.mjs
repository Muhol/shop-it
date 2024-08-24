import mongoose from 'mongoose'

async function connectDB (){
    try {
        // await mongoose.connect(process.env.MONGODB_URI)
        await mongoose.connect("mongodb+srv://ianmuhol48:hdzqJhUForD9KB8x@onshop.zjeczfr.mongodb.net/onshop?retryWrites=true&w=majority&appName=onshop")
        console.log("connected to db")
    } catch (err) {
        console.log("erreooo..mdb", err.message)
    }
}

export default connectDB