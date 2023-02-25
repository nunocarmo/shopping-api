import express from 'express';
import createCart from '../controllers/cart/createCart';
import getCart from '../controllers/cart/getCart';
import updateCart from '../controllers/cart/updateCart';
import verifyToken from '../middleware/verifyToken';
import { controllersFnType } from '../types/controllersFnType';
import { verifyTokenFnType } from '../types/verifyTokenFnType';
const router = express.Router();




router.post('/', verifyToken as verifyTokenFnType, createCart as controllersFnType);
router.get('/', verifyToken as verifyTokenFnType, getCart as controllersFnType);
router.patch('/', verifyToken as verifyTokenFnType, updateCart as controllersFnType);
export default router;
