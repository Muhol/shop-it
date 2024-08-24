import userModel from "../models/userModel.mjs"

const uploadProductPermission = async(userId) => {
    const user = await userModel.findById(userId)

    if(user.role !== "ADMIN"){
        return false
    }

    return true
}

export default uploadProductPermission