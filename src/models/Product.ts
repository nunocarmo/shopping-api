import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    img: { type: String, require: true },
    categories: { type: String, require: true },
    price: { type: Number, require: true },
    rating: { type: Number, default: 0 },
    amount: { type: Number, require: true },
});

export default mongoose.model("Product", productSchema);
