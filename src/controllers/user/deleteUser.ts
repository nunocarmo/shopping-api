import { Response } from 'express';
import User from '../../models/User';
import { authRequest } from '../../types/authRequest';

export default function deleteUser(req: authRequest, res: Response) {
    const { id } = req.user;
    User.findByIdAndDelete(id)
        .then(() => res.status(200).send('Account Deleted'))
        .catch(() => res.status(500).send('Something went wrong'));
}
