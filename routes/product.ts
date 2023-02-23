import express from "express";
import getAllProducts from "../controllers/product/getAllProducts.js";
import getRandomProducts from "../controllers/product/getRandomProducts.js";
import searchProducts from "../controllers/product/searchProducts.js";
const router = express.Router();


router.get("/", getAllProducts);
router.get("/random", getRandomProducts);
router.get("/search", searchProducts);

export default router;
