import userModel from "../../models/userModel.mjs"
import bcrypt from "bcryptjs"

const userSignUpController = async (req,res) =>{
    // res.status(201).json({message: "im here"})

    try {
        const { email, password ,username} = req.body 
        console.log("req.body", req.body);

        const userExists = await userModel.findOne({email})

        if(userExists){
            throw new Error("User already Exists")
        }


        if(!email){
            throw new Error("please enter your email")
        }
        if(!password){
            throw new Error("please enter your password")
        }
        if(!username){
            throw new Error("please enter your username")
        }

        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        if(!hashedPassword){
            throw new Error ("something is wrong ")
        }
        
        const payload = {
            ...req.body,
            role: "GENERAL", 
            password: hashedPassword,
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data :saveUser,
            success: true,
            error: false,
            message: "user created successfully...."
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

export default userSignUpController