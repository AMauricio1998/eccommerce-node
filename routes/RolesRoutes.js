import express from 'express';
import { actualizarRol, getRol, getRoles, nuevoRol } from '../controllers/RolesController.js';
const router = express.Router();

router.get('/', getRoles);
router.post('/', nuevoRol);
router.get('/:id', getRol);
router.put('/:id', actualizarRol);

export default router;