import express from "express";
import createOrder from "../controllers/order/createOrder.js";
import getUserOrders from "../controllers/order/getUserOrders.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getUserOrders);

export default router;