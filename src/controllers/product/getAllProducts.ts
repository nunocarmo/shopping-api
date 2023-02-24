import { Request, Response } from "express";
import Product from "../../models/Product";


export default async function getAllProducts(req: Request, res: Response) {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
}
