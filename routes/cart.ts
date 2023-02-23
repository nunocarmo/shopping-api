import express, { Request, Response } from "express";
import createCart from "../controllers/cart/createCart.js";
import getCart from "../controllers/cart/getCart.js";
import updateCart from "../controllers/cart/updateCart.js";
import verifyToken from "../middleware/verifyToken.js";
import { authRequest } from "../types/authRequest.js";
import { controllersFnType } from "../types/controllersFnType.js";
import { verifyTokenFnType } from "../types/verifyTokenFnType.js";
const router = express.Router();




router.post("/", verifyToken as verifyTokenFnType, createCart as controllersFnType);
router.get("/", verifyToken as verifyTokenFnType, getCart as controllersFnType);
router.patch("/", verifyToken as verifyTokenFnType, updateCart as controllersFnType);
export default router;
