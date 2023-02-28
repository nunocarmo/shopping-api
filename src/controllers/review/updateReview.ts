import { Response } from 'express';
import Review from '../../models/Review';
import addReviewBody from '../../types/addReviewBody';
import { authRequest } from '../../types/authRequest';

export default async function updateReview(req: authRequest, res: Response) {
    const { id } = req.user;
    const { product, comment, rating } = req.body as addReviewBody;
    if (!product) return res.status(400).send();
    const updateBody: addReviewBody = {};
    if (comment) updateBody.comment = comment;
    if (rating) updateBody.rating = rating;

    await Review.findOneAndUpdate({ userId: id, productId: product }, { $set: updateBody });
    res.status(200).json({ message: 'Review updated' });
}