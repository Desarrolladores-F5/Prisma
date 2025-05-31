import { Router } from 'express';
import {
  crearRespuestaFormulario,
  obtenerRespuestasFormulario,
  obtenerRespuestasPorFormulario, // ✅ Importación del nuevo controlador
} from '../controllers/respuesta_formulario.controller';

import { validarToken } from '../middlewares/validarToken';

const router = Router();

// ✅ Rutas disponibles
router.post('/', validarToken, crearRespuestaFormulario);
router.get('/', validarToken, obtenerRespuestasFormulario);
router.get('/por-formulario', validarToken, obtenerRespuestasPorFormulario); // ✅ Nueva ruta

export default router;
