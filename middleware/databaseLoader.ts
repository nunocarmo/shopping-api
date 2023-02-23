import Product from "../models/Product.js";
import { productType } from "../types/productType.js";

export default async function databaseLoader() {
    const products: productType[] = await fetch("https://fakestoreapi.com/products").then(items => items.json());
    products.forEach(async (product) => {
        const newProduct = new Product({
            title: product.title,
            description: product.description,
            img: product.image,
            categories: product.category,
            price: product.price,
            rating: product.rating.rate,
            amount: 20,
        });
        const exist = await Product.exists({ title: product.title })
        if (exist === null) newProduct.save();
    });

}
