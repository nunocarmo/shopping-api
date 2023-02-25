import { Request, Response } from 'express';
import Product from '../../models/Product';
import { productType } from '../../types/productType';

export default async function createProduct(req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const { amount, categories, description, img, price, title }: productType = req.body;
    if (!amount || !categories || !description || !img || !price || !title) return res.status(400).send('missing fields');
    if (isNaN(price) || isNaN(amount)) return res.status(400).send('missing number on some fields');
    const newProduct = new Product({ title, description, img, categories, price, amount, });
    const existingProduct: productType | null = await Product.findOne({ title });
    if (existingProduct) return res.status(409).send('Product Already Exists');
    const productCreated: productType = await newProduct.save();
    res.status(200).json(productCreated);
}