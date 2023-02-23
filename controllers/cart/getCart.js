import Cart from "../../models/Cart.js";


export default function getCart(req, res) {
    Cart.findOne({ userId: req.user.id })
        .then(cart => res.status(200).json(cart))
        .catch(err => res.status(500).send("Something went wrong"));
}