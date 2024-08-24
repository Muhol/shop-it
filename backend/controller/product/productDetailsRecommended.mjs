import productModel from "../../models/productModel.mjs";

const recommendedProducts = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(id)

    const mainproduct = await productModel.findOne({ _id: id });
    const cartegory = mainproduct.cartegory;
    if (mainproduct) {
      const recommended = await productModel.find({ cartegory });
      console.log("productid",mainproduct._id)
      const productid = mainproduct._id
      const index = recommended.findIndex(product => product._id.equals(productid))
      console.log(index)
      const deleted = recommended.splice(index, 1)
      console.log("deleted",deleted)
      if(deleted){
          res.status(200).json({
            data: recommended,
            success: true,
            error: false,
          });
      }


    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export default recommendedProducts;
