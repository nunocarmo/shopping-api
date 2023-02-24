import User from "../../models/User";
import CryptoJS from "crypto-js";
import { Request, Response } from "express";
import { registerBodyType } from "../../types/registerBodyType";



export default function register(req: Request, res: Response) {
    const { username, email, password } = req.body as registerBodyType;
    if (!username || !email || !password) return res.status(400).send({ error: "Missing fields" });
    const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.ENCRYPT_KEY as string),
    })
    newUser.save()
        .then(savedUser => res.status(201).json(savedUser))
        .catch((err) => {
            if (err.status === 500) return res.status(500).send("Something went wrong");
            return res.status(409).send("Account already exists");
        });
}
