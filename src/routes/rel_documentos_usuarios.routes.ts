// src/routes/rel_documentos_usuarios.routes.ts
import { Router } from 'express';
import {
  asignarDocumentoAUsuario,
  obtenerDocumentosPorUsuario,
  eliminarAsignacionDocumentoUsuario // 👈 Asegúrate de tener esta función creada y exportada
} from '../controllers/rel_documentos_usuarios.controller';

const router = Router();

// Asignar un documento a un usuario
router.post('/', asignarDocumentoAUsuario);

// Obtener documentos por ID de usuario
router.get('/:usuario_id', obtenerDocumentosPorUsuario);

// Eliminar asignación específica
router.delete('/:id', eliminarAsignacionDocumentoUsuario); // Asegúrate de que esta función exista

export default router;
