import { Request } from "express";
import { authRequest } from "./authRequest";

type orderType = Request & authRequest & {
    products: {
        productId: String
        quantity: number
    }
    amount: number
    address: Object
}
export { orderType }