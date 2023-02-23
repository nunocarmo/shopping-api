import Order from "../../models/Order.js";


export default function getUserOrders(req, res) {
    Order.find({ userId: req.user.id })
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(500).send("Something went wrong"));
}