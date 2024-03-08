import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import upload from '../config/Multer.js';
import { 
    createCategory, 
    getCategories, 
    getCategory, 
    updateCategory
} from '../controllers/dashboard/CategoriesController.js';

const router = express.Router();

router.get('/', checkAuth, getCategories);
router.post('/', checkAuth, upload.array('image', 1), createCategory);
router.get('/:id', checkAuth, getCategory);
router.put('/:id', checkAuth, upload.array('image', 1), updateCategory);

export default router;