import { Response } from 'express';
import Cart from '../../models/Cart';
import { authRequest } from '../../types/authRequest';
import { cartProduct } from '../../types/cartProduct';
import { cartUpdateType } from '../../types/cartUpdateType';

export default function updateCart(req: authRequest, res: Response) {
    const { products } = req.body as cartUpdateType;
    const mapedProducts: cartProduct[] = products
        ?.filter(({ productId, quantity }) => (productId !== undefined && quantity >= 1))
        ?.map(({ productId, quantity }) => ({ productId, quantity })) || [];
    const updateBody: cartUpdateType = {};
    if (mapedProducts.length > 0 || products?.length) updateBody.products = mapedProducts;
    Cart.findOneAndUpdate({ userId: req.user.id }, { $set: updateBody }, { new: true })
        .then(updatedCart => res.status(200).json(updatedCart))
        .catch(() => res.status(500).send('Something went wrong'));
}
