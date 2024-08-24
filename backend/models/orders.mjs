import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema({
productId: {type: Schema.Types.ObjectId, ref: 'product', required: true},
name: {type: String, required: true},
price: {type: Number, required: true},
quantity: {type: Number, required: true},
})

const OrderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    items: [itemSchema],
    totalAmount: {type: Number, required: true},
    delivery: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'],
        required: true
    },
    shippingAddress: {
        city: { type: String},
        country: { type: String},
        line1:{ type: String},
        line2:{ type: String},
        postal_code: { type: String},
        state:{ type: String},
    },
    name: {type: String}
},{
    timestamps: true
})

OrderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

const OrderModel = mongoose.model('order', OrderSchema)

export default OrderModel