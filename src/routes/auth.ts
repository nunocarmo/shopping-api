import express from 'express';
import login from '../controllers/authentication/login';
import register from '../controllers/authentication/register';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
export default router;
