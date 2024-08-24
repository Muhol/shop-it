import mongoose from "mongoose";
// const Schema = mongoose.Schema;

 
const productSchema = mongoose.Schema({
    productName : String,
    brandName : String,
    cartegory : String,
    productImage: [],
    description : String,
    price : Number,
    sellingPrice : Number,
},{
    timestamps : true
})

const productModel = mongoose.model("product",productSchema)

export default productModel 