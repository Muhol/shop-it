import productModel from "../../models/productModel.mjs"

const getSingleProductDetails = async(req,res) =>{
    try {
        const {id} = req.body

        const product = await productModel.findById(id)

        if(product) {
            res.status(200).json({
                message: "success",
                data: product,
                success: true,
                error:false
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message: error.message||error,
            success: false,
            error: true
        })
        
    }
}

export default getSingleProductDetails