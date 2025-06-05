import { Router } from 'express';
import {
  obtenerNotificaciones,
  crearNotificacion,
  actualizarNotificacion,
  eliminarNotificacion,
} from '../controllers/notificacion.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';
import { autorizarRol } from '../middlewares/autorizarRol'; 

const router = Router();

// 🔹 Supervisores (rol 2) y Administradores (rol 1) pueden ver notificaciones
router.get('/', validarToken, autorizarRol(1, 2), obtenerNotificaciones);

// 🔐 Solo administradores pueden modificar
router.post('/', validarToken, esAdministrador, crearNotificacion);
router.put('/:id', validarToken, esAdministrador, actualizarNotificacion);
router.delete('/:id', validarToken, esAdministrador, eliminarNotificacion);

export default router;
