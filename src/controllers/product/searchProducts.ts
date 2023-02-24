import { Response } from "express";
import Product from "../../models/Product";
import { searchParamsType } from "../../types/searchParamsType";
import { searchRequestType } from "../../types/searchRequestType";

export default async function searchProducts(req: searchRequestType, res: Response) {
    const { categories, rating, price, title } = req.query;
    let page = req.query.page;
    let limit = req.query.limit;
    if (isNaN(page)) page = 0;
    if (isNaN(limit) || limit > 5) limit = 5;
    page = Math.abs(page);
    limit = Math.abs(limit);
    const searchQuery: searchParamsType = {}
    if (categories) searchQuery.categories = categories;
    if (rating) searchQuery.rating = { $gte: rating };
    if (price) searchQuery.price = { $lte: price };
    if (title) searchQuery.title = { $regex: title, $options: "i" };

    Product.find(searchQuery).skip(page * limit).limit(limit)
        .then(allProducts => res.status(200).json(allProducts))
        .catch(err => res.status(500).send("Something went wrong"));
}
