import cartModel from "../../models/cart.mjs"


const deleteCart = async(req,res) => {
    try {
        const userId = res.userId
        
        const clearCart = await cartModel.findOneAndDelete({userId})

        if(!clearCart){
            throw new Error('Something went wrong')
        }

        res.status(400).json({
            message: "Cart cleared...",
            success: true,
            error: false
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: true
        })
    }
}

export default deleteCart