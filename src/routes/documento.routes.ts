import { Router } from 'express';
import {
  obtenerDocumentos,
  obtenerMisDocumentos,
  crearDocumento,
  actualizarDocumento,
  eliminarDocumento,
} from '../controllers/documento.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// ✅ Obtener todos los documentos activos (para administrador o público general)
router.get('/', validarToken, obtenerDocumentos);

// ✅ Obtener documentos del usuario autenticado (trabajador)
router.get('/mis-documentos', validarToken, obtenerMisDocumentos);

// ✅ Crear un documento (solo administrador)
router.post('/', validarToken, esAdministrador, crearDocumento);

// ✅ Actualizar un documento por ID (solo administrador)
router.put('/:id', validarToken, esAdministrador, actualizarDocumento);

// ✅ Eliminar un documento por ID (solo administrador)
router.delete('/:id', validarToken, esAdministrador, eliminarDocumento);

export default router;
