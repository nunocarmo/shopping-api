import Cart from "../../models/Cart.js";


export default function createCart(req, res) {
    Cart.findOne({ userId: req.user.id })
        .then(cart => create(req, res, cart))
        .catch(err => res.status(500).send("Something went wrong"));
}
function create(req, res, cart) {
    if (cart) return res.status(409).send();
    const newCart = new Cart({ userId: req.user.id });
    newCart.save();
    res.status(201).send();
}   