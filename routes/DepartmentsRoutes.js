import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { createDepartment, getDepartments, updateDepartment } from '../controllers/dashboard/DepartmentsController.js';

const router = express.Router();

router.get('/', checkAuth, getDepartments);
router.post('/', checkAuth, createDepartment);
router.put('/:id', checkAuth, updateDepartment);

export default router;