import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: String, require: true, unique: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ]
});

export default mongoose.model("Cart", cartSchema);
