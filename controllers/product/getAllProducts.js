import Product from "../../models/Product.js";


export default async function getAllProducts(req, res) {
    const allProducts = await Product.find();
    res.json(allProducts);
}