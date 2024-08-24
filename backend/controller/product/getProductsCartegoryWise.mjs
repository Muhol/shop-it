import productModel from "../../models/productModel.mjs"

const getProductsCartegoryWise = async(req,res) => {
    try {

        const groupedProducts = await productModel.aggregate([
            {
                $group:{
                    _id: '$cartegory',
                    items: {$push:'$$ROOT'}
                },
            },
        ]);

        // console.log(groupedProducts)

        res.status(200).json({
            message: "categories fetched successfully",
            data: groupedProducts,
            success: true,
            error:false,
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data : [],
            success: false,
            error: true
        })
        
    }
}

export default getProductsCartegoryWise