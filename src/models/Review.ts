import mongoose, { Types } from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: { type: Types.ObjectId, require: true },
    productId: { type: Types.ObjectId, require: true },
    comment: { type: String, require: true },
    rating: { type: Number, require: true },
});

export default mongoose.model('Review', reviewSchema);
