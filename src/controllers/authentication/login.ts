import User from '../../models/User';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import { registerBodyType } from '../../types/registerBodyType';
import { loginType } from '../../types/loginType';
import signJwt from '../../utils/signJwt';

export default function login(req: Request, res: Response) {
    const { username, password } = req.body as registerBodyType;
    if (!username || !password) return res.status(400).send({ error: 'Missing fields' });

    User.findOne({ username: username })
        .then(user => userCheck(user as loginType | null, password))
        .catch(() => res.status(500).send('Something went wrong'));

    function userCheck(user: loginType | null, bodyPassword: string | CryptoJS.lib.WordArray) {
        if (!user) return res.status(401).send('Wrong credentials');
        const pass = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPT_KEY as string).toString(CryptoJS.enc.Utf8);
        if (pass !== bodyPassword) return res.status(401).send('Wrong credentials');
        const token = signJwt(user);
        res.status(200).json({ username: user.username, email: user.email, token });
    }
}
