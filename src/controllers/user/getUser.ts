/* eslint-disable no-unsafe-optional-chaining */
import User from '../../models/User';
import { authRequest } from '../../types/authRequest';
import { Response } from 'express';
import { userModelType } from '../../types/userModelType';
export default function getUser(req: authRequest, res: Response) {
    const { id } = req.user;
    User.findById(id)
        .then((user: userModelType | null) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...rest } = user?._doc as userModelType;
            res.status(200).json({ ...rest });
        })
        .catch(() => res.status(500).send('Something went wrong'));
}
