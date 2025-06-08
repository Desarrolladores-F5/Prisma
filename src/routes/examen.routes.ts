import { Router } from 'express';
import {
  obtenerExamenes,
  obtenerExamenPorId,
  obtenerExamenPorCapacitacion,
  crearExamen,
  actualizarExamen,
  eliminarExamen
} from '../controllers/examen.controller';

const router = Router();

// Rutas principales para exámenes
router.get('/', obtenerExamenes);
router.get('/:id', obtenerExamenPorId);
router.get('/capacitacion/:capacitacion_id', obtenerExamenPorCapacitacion);
router.post('/', crearExamen);
router.put('/:id', actualizarExamen);
router.delete('/:id', eliminarExamen);

export default router;
