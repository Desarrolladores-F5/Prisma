import { Router } from 'express';
import {
  obtenerPreguntasPorExamen,
  crearPregunta,
  actualizarPregunta,
  eliminarPregunta
} from '../controllers/pregunta_examen.controller';

const router = Router();

// Rutas para gestión de preguntas de examen
router.get('/:examen_id', obtenerPreguntasPorExamen);
router.post('/', crearPregunta);
router.put('/:id', actualizarPregunta);
router.delete('/:id', eliminarPregunta);

export default router;
