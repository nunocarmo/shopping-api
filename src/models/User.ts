import mongoose from 'mongoose';
import { userModelType } from '../types/userModelType';



const userSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

export default mongoose.model<userModelType>('User', userSchema);
