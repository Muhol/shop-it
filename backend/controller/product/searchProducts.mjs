import productModel from "../../models/productModel.mjs"


const searchProducts = async(req,res) => {
    try {
        const query =req.query.q
        const regex = new RegExp(query,'i','g')

        const products = await productModel.find({
            "$or": [
                {
                    productName: regex
                },
                {
                    cartegory: regex
                }
            ]
        }
        )

        // console.log(products)
        if(!products){
            throw new Error("No Search Results...")
        }
        res.status(200).json({
            data: products,
            success:true,
            error:false
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message,
            success:false,
            error: true
        })
    }
}

export default searchProducts