// src/routes/respuesta_formulario.routes.ts

import { Router } from 'express';
import {
  crearRespuestaFormulario,
  obtenerRespuestasFormulario,
  obtenerRespuestasPorFormulario,
  obtenerRespuestaPorId,
  obtenerMisRespuestasFormulario, // ✅ Importación del nuevo controlador
} from '../controllers/respuesta_formulario.controller';

import { validarToken } from '../middlewares/validarToken';

const router = Router();

// ✅ Crear una nueva respuesta
router.post('/', validarToken, crearRespuestaFormulario);

// ✅ Obtener todas las respuestas activas (para administrador)
router.get('/', validarToken, obtenerRespuestasFormulario);

// ✅ Obtener respuestas por formulario_id (para administrador)
router.get('/por-formulario', validarToken, obtenerRespuestasPorFormulario);

// ✅ Obtener respuestas por formulario solo del usuario autenticado (para supervisor)
router.get('/mis-respuestas', validarToken, obtenerMisRespuestasFormulario);

// ✅ Obtener una respuesta específica por su ID
router.get('/:id', validarToken, obtenerRespuestaPorId);

export default router;
