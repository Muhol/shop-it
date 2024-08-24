
import mongoose from "mongoose"

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        
        required: true
    },
    quantity: { type: Number,  min: 1, default:1},
    price: { type: Number, required: true }
});

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        unique: true,
        required: true
    },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, default: 0 },
},{
    timestamps :true
});


const cartModel = mongoose.model("cart", cartSchema)
export default cartModel