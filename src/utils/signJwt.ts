import jwt from 'jsonwebtoken';
import { loginType } from '../types/loginType';

export default function signJwt(user: loginType): string {
    return jwt.sign({ id: user._id, name: user.username }, process.env.TOKEN_KEY as string, { expiresIn: '1d' });
}