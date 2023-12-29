import express from 'express';
import { authUser, getUsers, registerUser, confirmAccount } from '../controllers/UserController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

router.post('/', registerUser);
router.get('/', checkAuth, getUsers);
router.post('/login', authUser);
router.get('/confirm-account/:token', confirmAccount);

export default router;