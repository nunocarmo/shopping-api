import express from "express";
import createCart from "../controllers/cart/createCart.js";
import getCart from "../controllers/cart/getCart.js";
import updateCart from "../controllers/cart/updateCart.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();


router.post("/", verifyToken, createCart);
router.get("/", verifyToken, getCart);
router.patch("/", verifyToken, updateCart);
export default router;
