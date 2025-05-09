import { Router } from 'express';
import {
  obtenerNotificaciones,
  crearNotificacion,
  actualizarNotificacion,
  eliminarNotificacion,
} from '../controllers/notificacion.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// Listar todas las notificaciones (requiere autenticación)
router.get('/', validarToken, obtenerNotificaciones);

// Crear una nueva notificación (solo administradores)
router.post('/', validarToken, esAdministrador, crearNotificacion);

// Actualizar una notificación (marcar como leída u otros cambios)
router.put('/:id', validarToken, esAdministrador, actualizarNotificacion);

// Eliminar (soft delete) una notificación (solo administradores)
router.delete('/:id', validarToken, esAdministrador, eliminarNotificacion);

export default router;
