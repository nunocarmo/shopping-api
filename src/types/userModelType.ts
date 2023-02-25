import mongoose from 'mongoose';

interface userModelType extends mongoose.Document {
    username?: string;
    email?: string;
    password?: string | CryptoJS.lib.CipherParams;
    _doc?: userModelType
}


export { userModelType };