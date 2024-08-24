import userModel from "../../models/userModel.mjs"

const allUsersController = async(req, res) =>{
    try {
        const users = await userModel.find()

        if(!users){
            throw new Error("No Users available")
        }
        const _id = res.userId
        const currentuser = await userModel.findById(_id)
        if(currentuser.role==='ADMIN'){
            res.status(200).json({
                message: "Users fetched successfully",
                data: users,
                success: true,
                error: false
            })
        }else{
            throw new Error('You are not authorized to access this data!!!')
        }


     


    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
        
    }
}
export default allUsersController