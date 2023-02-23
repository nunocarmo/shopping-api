import User from "../../models/User.js";

export default async function getUser(req, res) {
    const { id } = req.user;
    User.findById(id)
        .then(user => {
            const { password, ...rest } = user._doc;
            res.status(200).json({ ...rest })
        })
        .catch(err => res.status(500).send("Something went wrong"));
}
