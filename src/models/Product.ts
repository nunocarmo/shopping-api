import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    img: { type: String, require: true },
    categories: { type: String, require: true },
    price: { type: Number, require: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    amount: { type: Number, require: true },
});

export default mongoose.model('Product', productSchema);
