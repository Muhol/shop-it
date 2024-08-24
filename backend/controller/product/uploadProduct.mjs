import uploadProductPermission from "../../helpers/permission.mjs"
import productModel from "../../models/productModel.mjs"


const UploadProductController = async(req,res) => {
    try {

        const userId= res.userId

        if(!uploadProductPermission(userId)){
            throw new Error("Permission denied")
        } 

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message:"product uploaded",
            success:true,
            error: false, 
            data: saveProduct
        })
    } catch (error) {
        res.status(400).json({
            message: error.message|| error,
            success: false,
            error:true
        })

        
    }
}

export default UploadProductController