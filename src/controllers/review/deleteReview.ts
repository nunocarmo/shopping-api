import { Response } from 'express';
import Product from '../../models/Product';
import Review from '../../models/Review';
import addReviewBody from '../../types/addReviewBody';
import { authRequest } from '../../types/authRequest';


export default async function deleteReview(req: authRequest, res: Response) {
    const { id } = req.user;
    const { product } = req.body as addReviewBody;
    if (!product) return res.status(400).send();
    const foundReview = await Review.findOne({ userId: id, productId: product });
    if (!foundReview) return res.status(404).json({ message: 'Review not found' });

    const foundProduct = await Product.findOne({ productId: product });
    if (!foundProduct) return res.status(404).json({ message: 'Product not found' });
    const indexToDelete = foundProduct.reviews.indexOf(foundReview._id);
    foundProduct.reviews.splice(indexToDelete, 1);

    foundReview.delete();
    foundProduct.save();

    res.status(200).json({ message: 'Review deleted' });
}