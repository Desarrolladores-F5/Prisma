// src/routes/documento.routes.ts
import { Router } from 'express';
import {
  obtenerDocumentos,
  obtenerMisDocumentos,
  crearDocumento,
  actualizarDocumento,
  eliminarDocumento,
  obtenerDocumentoPorId,
  confirmarRecepcionDocumento,
  obtenerConfirmacionesDocumento,
} from '../controllers/documento.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// 🔹 Obtener todos los documentos activos (solo administrador)
router.get('/', validarToken, esAdministrador, obtenerDocumentos);

// 🔹 Obtener documentos asignados al usuario autenticado
router.get('/mis-documentos', validarToken, obtenerMisDocumentos);

// 🔹 Confirmar recepción de documento (supervisor/trabajador)
router.put('/recepcionar/:documentoId', validarToken, confirmarRecepcionDocumento);

// 🔹 Obtener un documento por ID (solo administrador)
router.get('/:id', validarToken, esAdministrador, obtenerDocumentoPorId);

// 🔹 Obtener confirmaciones de recepción por documento (solo administrador)
router.get('/:id/confirmaciones', validarToken, esAdministrador, obtenerConfirmacionesDocumento);

// 🔹 Crear un nuevo documento y asignarlo (solo administrador)
router.post('/', validarToken, esAdministrador, crearDocumento);

// 🔹 Actualizar parcialmente un documento (solo administrador)
//    Ej: PATCH /:id  { "activo": false }
router.patch('/:id', validarToken, esAdministrador, actualizarDocumento);

// (Opcional) si quieres conservar PUT para updates completos, puedes dejarlo en paralelo:
// router.put('/:id', validarToken, esAdministrador, actualizarDocumento);

// 🔹 Eliminar (soft delete) un documento por ID (solo administrador)
router.delete('/:id', validarToken, esAdministrador, eliminarDocumento);

export default router;
