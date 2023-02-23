import { Response } from "express";
import Order from "../../models/Order.js";
import { authRequest } from "../../types/authRequest.js";

export default function getUserOrders(req: authRequest, res: Response) {
    Order.find({ userId: req.user.id })
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(500).send("Something went wrong"));
}