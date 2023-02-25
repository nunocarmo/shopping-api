import express from 'express';
import deleteUser from '../controllers/user/deleteUser';
import getUser from '../controllers/user/getUser';
import updateUser from '../controllers/user/updateUser';
import verifyToken from '../middleware/verifyToken';
import { controllersFnType } from '../types/controllersFnType';
import { verifyTokenFnType } from '../types/verifyTokenFnType';
const router = express.Router();


router.get('/profile', verifyToken as verifyTokenFnType, getUser as controllersFnType);
router.patch('/update', verifyToken as verifyTokenFnType, updateUser as controllersFnType);
router.delete('/delete', verifyToken as verifyTokenFnType, deleteUser as controllersFnType);

export default router;
