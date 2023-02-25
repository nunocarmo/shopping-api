import { Request, Response } from 'express';
import Product from '../../models/Product';


export default function getRandomProducts(req: Request, res: Response) {
    Product.aggregate([{ $sample: { size: 5 } }])
        .then(randomProducts => res.status(200).json(randomProducts))
        .catch(() => res.status(500).send('Something went Wrong'));
}
