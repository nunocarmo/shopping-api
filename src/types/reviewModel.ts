import mongoose from 'mongoose';

type reviewModel = mongoose.Document & {
    userId: mongoose.ObjectId
    comment: string
    rating: string
}

export default reviewModel;