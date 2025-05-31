import { Router } from 'express';
import {
  obtenerFormularios,
  obtenerFormularioPorId,
  crearFormulario,
  actualizarFormulario,
  eliminarFormulario,
} from '../controllers/formulario.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// ✅ Primero las rutas más específicas
router.get('/', validarToken, obtenerFormularios);
router.post('/', validarToken, esAdministrador, crearFormulario);
router.put('/:id', validarToken, esAdministrador, actualizarFormulario);
router.delete('/:id', validarToken, esAdministrador, eliminarFormulario);

// ✅ Al final: ruta dinámica por ID
router.get('/:id', validarToken, obtenerFormularioPorId);

export default router;
