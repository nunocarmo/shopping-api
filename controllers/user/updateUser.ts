import User from "../../models/User.js";
import CryptoJS from "crypto-js";
import { Response } from "express";
import { authRequest } from "../../types/authRequest.js";
import { userModelType } from "../../types/userModelType.js";


export default async function updateUser(req: authRequest, res: Response) {
    const { id } = req.user;
    const { username, email, password } = req.body;
    const updateBody: userModelType = {};
    if (await User.findOne({ username })) return res.status(409).send("Username already exists");
    if (await User.findOne({ email })) return res.status(409).send("Email already exists");
    if (username) updateBody.username = username;
    if (email) updateBody.email = email;
    if (password) updateBody.password = CryptoJS.AES.encrypt(password, process.env.ENCRYPT_KEY as string);
    User.findByIdAndUpdate(id, { $set: updateBody }, { new: true })
        .then(updatedUser => res.status(200).send("User Was Updated"))
        .catch(err => res.status(500).send("Something went wrong"));
}
