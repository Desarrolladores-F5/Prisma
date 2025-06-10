import { Router } from 'express';
import {
  obtenerExamenes,
  obtenerExamenPorId,
  obtenerExamenPorCapacitacion,
  crearExamen,
  actualizarExamen,
  eliminarExamen
} from '../controllers/examen.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// Rutas principales para exámenes
router.get('/', validarToken, esAdministrador, obtenerExamenes);
router.get('/:id', validarToken, esAdministrador, obtenerExamenPorId);
router.get('/capacitacion/:capacitacion_id', validarToken, esAdministrador, obtenerExamenPorCapacitacion);
router.post('/', validarToken, esAdministrador, crearExamen);
router.put('/:id', validarToken, esAdministrador, actualizarExamen);
router.delete('/:id', validarToken, esAdministrador, eliminarExamen); 

export default router;
