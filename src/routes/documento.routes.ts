import { Router } from 'express';
import {
  obtenerDocumentos,
  crearDocumento,
  actualizarDocumento,
  eliminarDocumento,
} from '../controllers/documento.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// ✅ Obtener todos los documentos (requiere autenticación)
router.get('/', validarToken, obtenerDocumentos);

// ✅ Crear un documento (solo administrador)
router.post('/', validarToken, esAdministrador, crearDocumento);

// ✅ Actualizar un documento por ID (solo administrador)
router.put('/:id', validarToken, esAdministrador, actualizarDocumento);

// ✅ Eliminar un documento por ID (solo administrador)
router.delete('/:id', validarToken, esAdministrador, eliminarDocumento);

export default router;
