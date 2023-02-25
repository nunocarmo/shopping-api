import { Response } from 'express';
import Cart from '../../models/Cart';
import { authRequest } from '../../types/authRequest';


export default function getCart(req: authRequest, res: Response) {
    Cart.findOne({ userId: req.user.id }).populate('products.productId')
        .then(cart => res.status(200).json(cart))
        .catch(() => res.status(500).send('Something went wrong'));
}
