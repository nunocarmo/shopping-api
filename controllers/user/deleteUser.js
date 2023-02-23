import User from "../../models/User.js";

export default async function deleteUser(req, res) {
    const { id } = req.user;
    console.log(id)
    User.findByIdAndDelete(id)
        .then(user => res.status(200).send("Account Deleted"))
        .catch(err => {
            res.status(500).send("Something went wrong")
        });
}