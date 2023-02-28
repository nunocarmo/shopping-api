import { Types } from 'mongoose';

type addReviewBody = {
    product?: Types.ObjectId | string
    comment?: string
    rating?: string
}

export default addReviewBody;