import { Response } from 'express';
import Review from '../../models/Review';
import addReviewBody from '../../types/addReviewBody';
import { authRequest } from '../../types/authRequest';

export default async function getUserReview(req: authRequest, res: Response) {
    const { id } = req.user;
    const { product } = req.body as addReviewBody;
    if (!product) return res.status(400).send();
    const review = await Review.findOne({ userId: id, productId: product });
    res.status(200).json(review);
}