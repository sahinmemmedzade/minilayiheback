import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Color"
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Size"
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    cartItems: [cartItemSchema]
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
