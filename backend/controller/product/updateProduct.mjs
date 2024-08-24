import uploadProductPermission from "../../helpers/permission.mjs"
import productModel from "../../models/productModel.mjs"

const updateProductController = async(req,res) =>{
    try {
        const userId= res.userId

        if(!uploadProductPermission(userId)){
            throw new Error("Permission denied")
        } 
        
        const {_id,productName,brandName,cartegory,productImage,description,price,sellingPrice} = req.body


        const payload = {
            ...(productName && {productName: productName}),
            ...(brandName && {brandName: brandName}),
            ...(cartegory && {cartegory: cartegory}),
            ...(productImage && {productImage: productImage}),
            ...(description && {description: description}),
            ...(price && {price: price}),
            ...(sellingPrice && {sellingPrice: sellingPrice}),
        }

        const updatedProduct = await productModel.findByIdAndUpdate(_id, payload)

        if(!updatedProduct){
            throw new Error("Problem Updating product....")
        }

        res.status(200).json({
            message: "product updated successfully",
            data: updatedProduct,
            success: true,
            error:false

        })


    } catch (error) {
        res.status(400).json({ 
            message: error.message || error,
            data: [],
            success: false,
            error: true
        })
    }
}

export default updateProductController