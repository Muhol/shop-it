import cartModel from "../../models/cart.mjs";

const deleteCartItem = async (req, res) => {
  try {
    const userId = res.userId;

    const { itemId } = req.body;

    const itemToDelete = await cartModel.findOne(
      {
        userId,
        "items._id": itemId,
      },
      { 
        "items.$": 1,
      }
    );

    const upQty = Number(itemToDelete.items[0].quantity);
    const upPrice = Number(itemToDelete.items[0].price);

    const deleteItem = await cartModel.updateOne(
      { userId: userId },
      {
        $pull: { items: { _id: itemId } },
        $inc: {
          totalPrice: - upQty * upPrice,
        },
      },
    {new: true}
    );
  
    if (!deleteItem) {
      throw new Error("something went wrong deleting cart item....");
    }
    res.status(200).json({
      message: "Cart Item deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export default deleteCartItem;
