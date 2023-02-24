import User from "../../models/User";
import { authRequest } from "../../types/authRequest";
import { Response } from "express";
import { userModelType } from "../../types/userModelType";
export default function getUser(req: authRequest, res: Response) {
    const { id } = req.user;
    User.findById(id)
        .then((user: userModelType | any) => {
            const { password, ...rest } = user?._doc;
            res.status(200).json({ ...rest })
        })
        .catch(err => res.status(500).send("Something went wrong"));
}
