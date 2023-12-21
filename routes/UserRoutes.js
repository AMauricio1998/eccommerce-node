import express from 'express';
import { getUsers, registerUser } from '../controllers/UserController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

router.post('/', registerUser);
router.get('/', checkAuth, getUsers);

export default router;