import { Response } from 'express';
import Product from '../../models/Product';
import Review from '../../models/Review';
import addReviewBody from '../../types/addReviewBody';
import { authRequest } from '../../types/authRequest';

export default async function addReview(req: authRequest, res: Response) {
    const { id } = req.user;
    const { rating, comment, product } = req.body as addReviewBody;
    if (!rating || !comment || !product) return res.status(400).send();
    const newReview = new Review({ userId: id, productId: product, comment, rating });
    const foundProduct = await Product.findOne({ _id: product });
    const savedReview = await newReview.save();
    foundProduct?.reviews.push(savedReview._id);
    await foundProduct?.save();
    res.status(201).json({ message: 'Review added' });
}