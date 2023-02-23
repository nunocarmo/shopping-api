import { Response } from "express";
import Cart from "../../models/Cart.js";
import { authRequest } from "../../types/authRequest.js";


export default function createCart(req: authRequest, res: Response): void {
    Cart.findOne({ userId: req.user.id })
        .then(cart => create(req, res, cart))
        .catch(err => res.status(500).send("Something went wrong"));
}
function create(req: authRequest, res: Response, cart: any): Response<any, Record<string, any>> | void {
    if (cart) return res.status(409).send();
    const newCart = new Cart({ userId: req.user.id });
    newCart.save();
    res.status(201).send();
}   
