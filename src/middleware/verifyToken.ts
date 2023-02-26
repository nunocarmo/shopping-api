import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Response, NextFunction } from 'express';
import { authRequest, userType } from '../types/authRequest';



export default function verifyToken(req: authRequest, res: Response, next: NextFunction): Response<unknown, Record<string, unknown>> | void {
    const authToken = req.headers?.authorization;
    if (!authToken) return res.status(403).send('Not authenticated');
    const token = authToken.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_KEY as string, (err, user) => isTokenValid(err, user as userType));
    async function isTokenValid(err: jwt.VerifyErrors | null, user: userType) {
        if (err) return res.status(403).send('Token invalid');
        const userExists = await User.findById(user.id);
        if (!userExists) return res.status(401).send('User Not Found');
        req.user = user;
        next();
    }
}
