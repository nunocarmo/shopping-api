import { Request } from 'express';

type searchRequestType = Request & {
    query: {
        page: number
        limit: number
        categories?: string
        rating?: number
        price?: number
        title?: string
    }
}
export { searchRequestType };