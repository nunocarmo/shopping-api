import express from "express";
import login from "../controllers/authentication/login.js";
import register from "../controllers/authentication/register.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
export default router;