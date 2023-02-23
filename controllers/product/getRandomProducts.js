import Product from "../../models/Product.js";


export default function getRandomProducts(req, res) {
    Product.aggregate([{ $sample: { size: 5 } }])
        .then(randomProducts => res.json(randomProducts))
        .catch((err) => res.status(500).send("Something went Wrong"))
}
