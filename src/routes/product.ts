import express from 'express';
import createProduct from '../controllers/product/createProduct';
import getAllProducts from '../controllers/product/getAllProducts';
import getProductById from '../controllers/product/getProductById';
import getRandomProducts from '../controllers/product/getRandomProducts';
import searchProducts from '../controllers/product/searchProducts';
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);

router.get('/random', getRandomProducts);
router.get('/search', searchProducts);

router.get('/:id', getProductById);


export default router;
