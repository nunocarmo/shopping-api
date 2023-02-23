import express from "express";
import deleteUser from "../controllers/user/deleteUser.js";
import getUser from "../controllers/user/getUser.js";
import updateUser from "../controllers/user/updateUser.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();


router.get("/profile", verifyToken, getUser);
router.patch("/update", verifyToken, updateUser);
router.delete("/delete", verifyToken, deleteUser);

export default router;
