import jwt from "jsonwebtoken";
import User from "../models/User";
import { Response } from "express";
import { authRequest, userType } from "../types/authRequest";



export default function verifyToken(req: authRequest, res: Response, next: any): Response<any, Record<string, any>> | void {
    const authToken = req.headers.authorization;
    const token = authToken.split(" ")[1];
    if (!authToken) return res.status(401).send("Not authenticated");
    jwt.verify(token, process.env.TOKEN_KEY as string, (err, user) => isTokenValid(err, user as userType))
    async function isTokenValid(err: any, user: userType) {
        if (err) return res.status(403).send("Token invalid");
        const userExists = await User.findById(user.id);
        if (!userExists) return res.status(401).send("User Not Found");
        req.user = user;
        next();
    }
}
