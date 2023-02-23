import express from "express";
import createOrder from "../controllers/order/createOrder.js";
import getUserOrders from "../controllers/order/getUserOrders.js";
import verifyToken from "../middleware/verifyToken.js";
import { controllersFnType } from "../types/controllersFnType.js";
import { verifyTokenFnType } from "../types/verifyTokenFnType.js";

const router = express.Router();

router.post("/", verifyToken as verifyTokenFnType, createOrder as controllersFnType);
router.get("/", verifyToken as verifyTokenFnType, getUserOrders as controllersFnType);

export default router;