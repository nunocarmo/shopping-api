import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../../models/Product';


export default function getProductById(req: Request, res: Response) {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send();
    Product.findById(req.params.id).populate('reviews')
        .then(item => {
            if (item === null) return res.status(404).send();
            res.status(200).json(item);
        })
        .catch(() => res.status(500).send('Something went Wrong'));
}