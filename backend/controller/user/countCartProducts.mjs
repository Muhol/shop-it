import cartModel from "../../models/cart.mjs"


const cartProducts = async(req,res) => {
    try {
        const userId = res.userId
        // const userId = "665788848cba9bb66c6d643e"
        const cartCount = await cartModel.find({userId}).populate('items.productId')

        if(!cartCount){
            throw new Error("no items in cart")
        }
        
        res.json({
            message: "Cart found successfully...",
            data: cartCount,
            success: true,
            error: false 
        })

       
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: true,
            data:[]
        })
        
    }
}

export default cartProducts