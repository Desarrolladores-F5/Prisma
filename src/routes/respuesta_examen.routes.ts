import { Router } from 'express';
import {
  obtenerRespuestasPorExamen,
  obtenerRespuestasPorUsuario,
  crearRespuesta,
  actualizarRespuesta,
  eliminarRespuesta
} from '../controllers/respuesta_examen.controller';

const router = Router();

// Rutas para gestión de respuestas de examen
router.get('/examen/:examen_id', obtenerRespuestasPorExamen);
router.get('/usuario/:examen_id/:usuario_id', obtenerRespuestasPorUsuario);
router.post('/', crearRespuesta);
router.put('/:id', actualizarRespuesta);
router.delete('/:id', eliminarRespuesta);

export default router;
