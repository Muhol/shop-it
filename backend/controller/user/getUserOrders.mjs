import OrderModel from "../../models/orders.mjs"


const getUserOrdersController = async(req,res) => {
    try {
        const userId = res.userId
        
        const orders = await OrderModel.find({userId}).populate('items.productId')


        if(!orders){
            throw new Error("You don't have any orders")
        }
        console.log("orders....>>>>>" ,orders)

        res.status(200).json({
            data: orders,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

export default getUserOrdersController