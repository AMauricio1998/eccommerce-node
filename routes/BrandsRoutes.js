import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { 
    createBrand, 
    getBrand, 
    getBrands, 
    updateBrand 
} from '../controllers/dashboard/BrandsController.js';
import upload from '../config/Multer.js';
const router = express.Router();

router.get('/', checkAuth, getBrands);
router.get('/:id', getBrand);
router.post('/', checkAuth, upload.array('image', 1), createBrand);
router.put('/update/:id', checkAuth, upload.array('image', 1), updateBrand);

export default router;