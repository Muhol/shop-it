import userModel from "../../models/userModel.mjs"

 
const updateUser = async(req,res) =>{
    try {
        // res.send("its working ")
        const sessionId = res.userId

        const currentUser = await userModel.findById(sessionId)
        console.log("currentUser...///", currentUser.role)

        if(currentUser.role !== "ADMIN"){
            throw new Error("You are not authorized to modify user details ")
        }

        const { _id, email, username, profilePic, role} = req.body 

        const payload = {
            ...(email && {email : email}),
            ...(username && {username : username}),
            ...(role && {role : role}),
            ...(profilePic && {profilePic : profilePic})
        }

        // console.log("payload",payload)

        const updatedUser = await userModel.findByIdAndUpdate(_id, payload)

        if(!updatedUser){
            throw new Error("Error trying to update user")
        }

        res.status(200).json({
            message : "User Updated",
            data : updatedUser,
            success: true,
            error: false
        })


    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true 
        })
        
    }
}

export default updateUser