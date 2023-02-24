import express from "express";
import createOrder from "../controllers/order/createOrder";
import getUserOrders from "../controllers/order/getUserOrders";
import verifyToken from "../middleware/verifyToken";
import { controllersFnType } from "../types/controllersFnType";
import { verifyTokenFnType } from "../types/verifyTokenFnType";

const router = express.Router();

router.post("/", verifyToken as verifyTokenFnType, createOrder as controllersFnType);
router.get("/", verifyToken as verifyTokenFnType, getUserOrders as controllersFnType);

export default router;