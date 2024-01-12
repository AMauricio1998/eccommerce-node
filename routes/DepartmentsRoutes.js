import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { createDepartment, getDepartments } from '../controllers/dashboard/DepartmentsController.js';

const router = express.Router();

router.get('/', checkAuth, getDepartments);
router.post('/', checkAuth, createDepartment);

export default router;