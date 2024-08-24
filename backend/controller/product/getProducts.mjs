import productModel from "../../models/productModel.mjs"


const getProductController = async(req,res) => {
    try {
        const products = await productModel.find()

        if(!products){
            throw new Error("Unable to load products")
        }

        res.status(200).json({
            message: "products loaded successfully",
            data: products,
            success: true,
            error: false
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
export default getProductController