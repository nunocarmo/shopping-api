import { Response } from "express";
import User from "../../models/User.js";
import { authRequest } from "../../types/authRequest.js";

export default function deleteUser(req: authRequest, res: Response) {
    const { id } = req.user;
    User.findByIdAndDelete(id)
        .then(user => res.status(200).send("Account Deleted"))
        .catch(err => {
            res.status(500).send("Something went wrong")
        });
}
