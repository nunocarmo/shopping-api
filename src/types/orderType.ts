import { Request } from 'express';
import { authRequest } from './authRequest';

type orderType = Request & authRequest & {
    products: {
        productId: string
        quantity: number
    }
    amount: number
    address: unknown
}
export { orderType };