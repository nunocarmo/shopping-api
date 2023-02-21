import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    img: { type: String, require: true },
    categories: { type: Array },
    price: { type: Number, require: true }
});

export default mongoose.model("Product", productSchema);