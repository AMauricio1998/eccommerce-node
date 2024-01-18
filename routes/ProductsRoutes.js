import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { createProduct, getProduct, getProductsFromCategory, getProductsFromDepartment } from '../controllers/dashboard/products/ProductsController.js';

const router = express.Router();

router.get('/:id_department',  getProductsFromDepartment);
router.get('/get-product/:id',  getProduct);
router.get('/from-category/:id_category',  getProductsFromCategory);
router.post('/', checkAuth, createProduct);
export default router;