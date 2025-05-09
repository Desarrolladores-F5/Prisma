// src/routes/capacitacion.routes.ts
import { Router } from 'express';
import {
  obtenerCapacitaciones,
  crearCapacitacion,
  actualizarCapacitacion,
  eliminarCapacitacion
} from '../controllers/capacitacion.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// Todas las rutas protegidas con token, solo admin puede crear/editar/eliminar
router.get('/', validarToken, obtenerCapacitaciones);
router.post('/', validarToken, esAdministrador, crearCapacitacion);
router.put('/:id', validarToken, esAdministrador, actualizarCapacitacion);
router.delete('/:id', validarToken, esAdministrador, eliminarCapacitacion);

export default router;
