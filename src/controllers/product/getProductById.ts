import { Request, Response } from 'express';
import Product from '../../models/Product';


export default function getProductById(req: Request, res: Response) {
    Product.findById(req.params.id)
        .then(item => {
            if (item === null) return res.status(404).send();
            res.status(200).json(item);
        })
        .catch(() => res.status(500).send('Something went Wrong'));
}