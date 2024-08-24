import userModel from "../../models/userModel.mjs"

const userDetailsContoller = async(req,res) =>{

    try {
        
        const user = await userModel.findById(res.userId)


        res.status(200).json({
            data: user,
            success: true,
            error: false,
            message: "user details fetched successfully"
        })
        
    } catch (err) {
        res.status(400).json({
            message: err.message || err, 
            error: true,
            success: false,
        })
    }
}
export default userDetailsContoller