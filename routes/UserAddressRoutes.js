import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { 
    deleteAddress,
    getAddress, newAddress, setDefaultAddress 
} from '../controllers/users/UserAddressController.js';
const router = express.Router();

router.route('/:id_user')
    .get(checkAuth, getAddress)
    .post(checkAuth, newAddress);
router.put('/set-default-ddress/:id', checkAuth, setDefaultAddress);
router.delete('/:id', checkAuth, deleteAddress);
export default router;