import mongoose from 'mongoose';

type loginType = {
    _id?: string | mongoose.ObjectId
    username: string
    email: string
    password: string | CryptoJS.lib.CipherParams
}
export { loginType };