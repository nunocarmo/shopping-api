import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    const token = authToken.split(" ")[1];
    if (!authToken) return res.status(401).send("Not authenticated");
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => isTokenValid(err, user))
    async function isTokenValid(err, user) {
        if (err) return res.status(403).send("Token invalid");
        const userExists = await User.findById(user.id);
        if (!userExists) return res.status(401).send("User Not Found");
        req.user = user;
        next();
    }
}