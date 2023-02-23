import { Request } from "express";

type searchRequestType = Request & {
    query: {
        page: number
        limit: number
        categories?: String
        rating?: number
        price?: number
        title?: String
    }
}
export { searchRequestType }