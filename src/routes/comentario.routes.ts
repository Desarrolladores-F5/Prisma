// src/routes/comentario.routes.ts
import { Router } from 'express';
import {
  obtenerComentarios,
  crearComentario,
  obtenerComentariosPorEntidad,
} from '../controllers/comentario.controller';

const router = Router();

router.get('/', obtenerComentarios);
router.post('/', crearComentario);

// ✅ Nueva ruta para obtener comentarios filtrados
router.get('/entidad/:tipo/:id', obtenerComentariosPorEntidad);

export default router;
