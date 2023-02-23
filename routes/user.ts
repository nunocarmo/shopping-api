import express from "express";
import deleteUser from "../controllers/user/deleteUser.js";
import getUser from "../controllers/user/getUser.js";
import updateUser from "../controllers/user/updateUser.js";
import verifyToken from "../middleware/verifyToken.js";
import { controllersFnType } from "../types/controllersFnType.js";
import { verifyTokenFnType } from "../types/verifyTokenFnType.js";
const router = express.Router();


router.get("/profile", verifyToken as verifyTokenFnType, getUser as controllersFnType);
router.patch("/update", verifyToken as verifyTokenFnType, updateUser as controllersFnType);
router.delete("/delete", verifyToken as verifyTokenFnType, deleteUser as controllersFnType);

export default router;
