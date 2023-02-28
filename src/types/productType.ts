import mongoose from 'mongoose';

type productType = {
    _id?: unknown | undefined,
    title?: string,
    description?: string,
    img?: string,
    categories?: string,
    price?: number,
    reviews?: Array<mongoose.Types.ObjectId>,
    amount?: number,
    __v?: number,
}

export { productType };