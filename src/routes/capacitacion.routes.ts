// src/routes/capacitacion.routes.ts
import { Router } from 'express';
import {
  obtenerCapacitaciones,
  crearCapacitacion,
  actualizarCapacitacion,
  eliminarCapacitacion,
  obtenerCapacitacionesDisponibles, // ✅
} from '../controllers/capacitacion.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';
import { autorizarRol } from '../middlewares/autorizarRol';

const router = Router();

// 🔓 Ruta para trabajadores
router.get('/disponibles', validarToken, autorizarRol(3), obtenerCapacitacionesDisponibles);

// 🔹 Visualización permitida para Administradores y Supervisores
router.get('/', validarToken, autorizarRol(1, 2), obtenerCapacitaciones);

// 🔐 Modificaciones exclusivas del Administrador
router.post('/', validarToken, esAdministrador, crearCapacitacion);
router.put('/:id', validarToken, esAdministrador, actualizarCapacitacion);
router.delete('/:id', validarToken, esAdministrador, eliminarCapacitacion);

export default router;
