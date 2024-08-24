
const ordersController = async(req, res) => {
    try {
        const userId = res.userId
        
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error: true
        })
        
    }
}
export default ordersController