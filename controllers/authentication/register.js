import User from "../../models/User.js";
import CryptoJS from "crypto-js";

export default function register(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).send({ error: "Missing fields" });
    const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.ENCRYPT_KEY),
    })
    newUser.save()
        .then(savedUser => res.status(201).json(savedUser))
        .catch((err) => {
            if (err.status === 500) return res.status(500).send("Something went wrong");
            return res.status(409).send("Account already exists");
        });
}
