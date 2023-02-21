import express from "express";
import deleteUser from "../controllers/deleteUser.js";
import getUser from "../controllers/getUser.js";
import updateUser from "../controllers/updateUser.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();


router.get("/profile", verifyToken, getUser);
router.patch("/update", verifyToken, updateUser);
router.delete("/delete", verifyToken, deleteUser);

export default router;