import Order from "../../models/Order.js";


export default function createOrder(req, res) {
    const { products, amount, address } = req.body;
    if (!products || !amount || !address) return res.status(400).send("Missing information");
    const newOrder = new Order({
        userId: req.user.id,
        products,
        amount,
        address,
    });
    newOrder.save();
    res.status(200).send("Order Created");
}

