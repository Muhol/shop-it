import mongoose from "mongoose";
import cartModel from "../../models/cart.mjs";
import productModel from "../../models/productModel.mjs";

const addToCartController = async (req, res) => {
  try {
 const userId = res.userId;
    const { productId, quantity} = req?.body;
    const product = await productModel.findById(productId);
    const productPrice = product?.sellingPrice;
    const parsedprice = Number(productPrice);
    const parsedquantity = Number(quantity);

    const varQuantity = parsedquantity || 1

    const cart = await cartModel.findOne({ userId });
    if (cart) {
      const sameItemInCart = await cartModel.findOne(
        {
          userId: userId,
          "items.productId": productId,
        },
        {
          "items.$": 1, // Project only the matched items array
        }
      );
      if (sameItemInCart) {
        const varQuantity = parsedquantity || 1
        const newQuantity = sameItemInCart.items[0].quantity + varQuantity;

       

        const UpdatedQuantity = await cartModel.findOneAndUpdate(
          { userId, "items.productId": productId },
          {
            $set: {
              "items.$.quantity": newQuantity,
              "items.$.price": parsedprice,
            },
            $inc: {
              totalPrice:  parsedprice * varQuantity ,
            },
          },
          { new: true }
        );

        res.json({
          message: "1 item added to cart",
          data: UpdatedQuantity,
          success: true,
          error: false,
        });
        return;
      }

      const updatedCartItems = await cartModel.findByIdAndUpdate(cart._id, {
        userId: userId,
        items: [
          ...cart.items,
          {
            productId: productId,
            quantity: parsedquantity,
            price: parsedprice,
          },
        ],
        totalPrice: (cart.totalPrice += parsedprice * varQuantity),
      });

      res.json({
        message: "Product added to existing cart",
        data: updatedCartItems,
        success: true,
        error: false,
      });
      return;
    }
    if (!cart) {
      const cart = new cartModel({
        userId:  userId,
        items: [
          {
            productId: productId,
            quantity: parsedquantity,
            price: parsedprice,
          },
        ],
        totalPrice: parsedquantity * parsedprice,
      });
      const saveCart = await cart.save();

      res.json({
        message: "Product added to cart",
        data: saveCart,
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.log("error ..////////", error.message);

    res.status(400).json({
      message: error.message,
      data: [],
      success: false,
      error: true,
    });
  }
};

export default addToCartController;
