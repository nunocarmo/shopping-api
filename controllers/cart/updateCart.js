import Cart from "../../models/Cart.js";


export default function updateCart(req, res) {
    const { products } = req.body;
    const mapedProducts = products
        .filter(({ productId, quantity }) => (productId !== undefined && quantity >= 1))
        .map(({ productId, quantity }) => ({ productId, quantity }))
    const updateBody = {}
    if (mapedProducts.length > 0 || products.length === 0) updateBody.products = mapedProducts;
    Cart.findOneAndUpdate({ userId: req.user.id }, { $set: updateBody }, { new: true })
        .then(updatedCart => res.status(200).json(updatedCart))
        .catch(err => res.status(500).send("Something went wrong"));
}