import cartModel from "../../models/cart.mjs";

const updateCartQuantity = async (req, res) => {
  try {
    const userId = res.userId;
    const { itemId, funcType } = req.body;

    const cart = await cartModel.findOne({ userId });
    const cartItem = await cartModel.findOne(
      { userId, "items._id": itemId },
      {
        "items.$": 1,
      }
    );
    // console.log("item/////....", cartItem.quantity);
    const decQuantity = cartItem.items[0].quantity - 1;
    const incQuantity = cartItem.items[0].quantity + 1;
    const price = cartItem.items[0].price;
    const totalPrice = cart.totalPrice;
    const newTotalPrice = totalPrice - price

    if (funcType === "decrease") {
        if(cartItem?.items[0].quantity=== 1){
            return;
        }

      const increaseQuantity = await cartModel.updateOne(
        { userId, "items._id": itemId },
        {
          $set: {
            "items.$.quantity": decQuantity,
          },
          $inc: {
            totalPrice: -price
          }
        },
        { new: true }
      );

      res.status(200).json({
        message: "Quantity decreased.....",
        success: true,
        error: false 
      })

    }
    if (funcType === "increase") {
      const decreaseQuantity = await cartModel.updateOne(
        { userId, "items._id": itemId },
        {
          $set: {
            "items.$.quantity": incQuantity,
          },
          $inc: {
            totalPrice: price
          }
        },
        { new: true }
      );
      res.status(200).json({
        message: "Quantity increased.....",
        success: true,
        error: false 
      })

    }
  } catch (error) {
    // console.log("error",error.message)
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export default updateCartQuantity;
