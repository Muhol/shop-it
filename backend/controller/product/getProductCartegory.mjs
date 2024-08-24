import productModel from "../../models/productModel.mjs"


const getProductCartegoryController = async(req,res) => {
    try {
        const productCartegories = await productModel.distinct("cartegory")
        
        // ARRAY TO STORE ONE PRODUCT FROM EACH CARTEGORY
        const productByCartegory =[]

        for(const cartegory of productCartegories){
            const product= await productModel.findOne({cartegory})

            if(product){
                productByCartegory.push(product)
            }
        }

        res.status(200).json({
            message: "cartegory product...",
            success: true,
            error: false,
            data: productByCartegory
        })
        // console.log("cartegory", productCartegories)
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: true,
            data: []
        })
        
    }

}

export default getProductCartegoryController