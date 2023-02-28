import express from 'express';
import addReview from '../controllers/review/addReview';

import deleteReview from '../controllers/review/deleteReview';
import getUserReview from '../controllers/review/getUserReview';
import updateReview from '../controllers/review/updateReview';
import verifyToken from '../middleware/verifyToken';
import { controllersFnType } from '../types/controllersFnType';
import { verifyTokenFnType } from '../types/verifyTokenFnType';


const router = express.Router();


router.get('/', verifyToken as verifyTokenFnType, getUserReview as controllersFnType);
router.post('/', verifyToken as verifyTokenFnType, addReview as controllersFnType);
router.patch('/', verifyToken as verifyTokenFnType, updateReview as controllersFnType);
router.delete('/', verifyToken as verifyTokenFnType, deleteReview as controllersFnType);
export default router;
