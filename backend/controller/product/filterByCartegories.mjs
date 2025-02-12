import productModel from "../../models/productModel.mjs";

const filterByCartegories = async (req, res) => {
  try {
    const query = req.query.q;
    const cartegories = query?.split(",");


    if (query === "") {
      const products = await productModel.find();
      // console.log("all,.,.,///", products)

      res.status(200).json({
        message: "good",
        data: products,
        success: true,
        error: false,
      });
      return;
    }

    const products = await productModel.find({
      cartegory: { $in: cartegories },
    });

    res.status(200).json({
      message: "good",
      data: products,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export default filterByCartegories;
