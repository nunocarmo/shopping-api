import User from "../../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export default function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send({ error: "Missing fields" });

    User.findOne({ username: username })
        .then(user => userCheck(user, password))
        .catch(err => res.status(500).send("Something went wrong"))

    function userCheck(user, bodyPassword) {
        if (!user) return res.status(401).send("Wrong credentials");
        const pass = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        if (pass !== bodyPassword) return res.status(401).send("Wrong credentials");
        const token = jwt.sign({ id: user._id, name: user.username }, process.env.TOKEN_KEY, { expiresIn: "1d" })
        res.status(200).json({ username: user.username, email: user.email, token });
    }
}