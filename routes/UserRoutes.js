import express from 'express';
import { 
    authUser, 
    getUsers, 
    registerUser, 
    confirmAccount, 
    rememberPassword, 
    checkToken, 
    newPassword, 
    profileUser,
    updateUser,
    logout,
    getRoleUser
} from '../controllers/users/UserController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

router.post('/', registerUser);
router.get('/', checkAuth, getUsers);
router.post('/login', authUser);
router.get('/confirm-account/:token', confirmAccount);
router.post('/remember-password', rememberPassword);
router.route('/remember-password/:token').get(checkToken).patch(newPassword);
router.get('/profile', checkAuth, profileUser);
router.put('/profile/:id', checkAuth, updateUser);
router.post('/logout', checkAuth, logout);
router.get('/check-role', checkAuth, checkAuth, getRoleUser);

export default router;