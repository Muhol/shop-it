import userModel from "../../models/userModel.mjs";

const getUserDetailsController = async (req, res) => {
  try {
    const {_id, name, email, role} = req.body

    const user = await userModel.findById(_id)
    // if(err){
    //     throw new Error("nothing to worry about")
    // }
    
    res.status(200).json({
        message: "user found",
        data: user,
        success: true,
        error:false
    })
    console.log( "user details", userdetails)

  } catch (err) {
    // res.status(400).json({
    //     message : err.message || err,
    //     data :null,
    //     error: true,
    //     success: false
    // })
  }
};
export default getUserDetailsController;
