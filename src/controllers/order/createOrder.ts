import { Response } from 'express';
import Order from '../../models/Order';
import { orderType } from '../../types/orderType';


export default function createOrder(req: orderType, res: Response) {
    const { products, amount, address } = req.body;
    if (!products || !amount || !address) return res.status(400).send('Missing information');
    const newOrder = new Order({
        userId: req.user.id,
        products,
        amount,
        address,
    });
    newOrder.save();
    res.status(201).send('Order Created');
}

