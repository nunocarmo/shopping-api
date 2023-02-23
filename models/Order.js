import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }
});

export default mongoose.model("Order", orderSchema);
