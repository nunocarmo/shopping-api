import { Response } from 'express';
import Order from '../../models/Order';
import { authRequest } from '../../types/authRequest';

export default function getUserOrders(req: authRequest, res: Response) {
    Order.find({ userId: req.user.id }).populate('products.productId')
        .then(orders => res.status(200).json(orders))
        .catch(() => res.status(500).send('Something went wrong'));
}