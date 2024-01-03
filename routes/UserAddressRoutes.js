import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { 
    deleteAddress,
    getAddress, newAddress 
} from '../controllers/users/UserAddressController.js';
const router = express.Router();

router.route('/:id_user')
    .get(checkAuth, getAddress)
    .post(checkAuth, newAddress)
    .delete(checkAuth, deleteAddress);

export default router;