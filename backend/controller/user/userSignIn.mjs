import bcrypt from "bcryptjs"
import userModel from "../../models/userModel.mjs"
import jwt from "jsonwebtoken"

const userSignInController = async (req,res) => {
    // res.status(201).json({message: "im here"})
    try {
        const { email, password } = req.body

        // console.log(req.body)

        if(!email){
            throw new Error("please enter your Email")
        }
        if(!password){
            throw new Error("please enter your Password")
        }

        const user = await userModel.findOne({email})

        if(!user){
            throw new Error("User does not exist")
        }

        const checkPassword =await bcrypt.compare(password, user.password)
        // console.log(checkPassword)


        // res.status(201).json("You are logged in your password is valid")
        const tokenData = {
            _id : user._id,
            email : user.email
        }
        const token = await jwt.sign({
            data: tokenData
        }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 12 });

        const tokenOption ={
            httpOnly: true,
            secure: true
        }
        res.status(201).cookie("token",token,tokenOption).json({
            data : token,
            success: true,
            error: false,
            message: "logged in successfully...."
        })

    } catch (err) {
        res.json({
            message : err.message || err,
            error: true,
            success: false
        })
        console.log("not connected")
        
    }
}

export default userSignInController