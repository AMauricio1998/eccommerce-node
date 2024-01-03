import express from 'express';
import { actualizarRol, getRol, getRoles, nuevoRol } from '../controllers/users/RolesController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

router.get('/', checkAuth, getRoles);
router.post('/', checkAuth, nuevoRol);
router.get('/:id', checkAuth, getRol);
router.put('/:id', checkAuth, actualizarRol);

export default router;