// src/routes/capacitacion.routes.ts
import { Router } from 'express';
import {
  obtenerCapacitaciones,
  crearCapacitacion,
  actualizarCapacitacion,
  eliminarCapacitacion,
  obtenerCapacitacionesDisponibles,
  obtenerPreguntasPorCapacitacionId,
  responderExamenPorCapacitacionId,
  obtenerResultadoExamen
} from '../controllers/capacitacion.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';
import { autorizarRol } from '../middlewares/autorizarRol';

const router = Router();

// 🔓 Rutas para trabajadores
router.get('/disponibles', validarToken, autorizarRol(3), obtenerCapacitacionesDisponibles);
router.get('/:id/preguntas', validarToken, autorizarRol(3), obtenerPreguntasPorCapacitacionId);
router.post('/:id/responder', validarToken, autorizarRol(3), responderExamenPorCapacitacionId);
router.get('/:id/resultado', validarToken, autorizarRol(3), obtenerResultadoExamen); // ✅ parámetro corregido

// 🔹 Visualización permitida para Administradores y Supervisores
router.get('/', validarToken, autorizarRol(1, 2), obtenerCapacitaciones);

// 🔐 Modificaciones exclusivas del Administrador
router.post('/', validarToken, esAdministrador, crearCapacitacion);
router.put('/:id', validarToken, esAdministrador, actualizarCapacitacion);
router.delete('/:id', validarToken, esAdministrador, eliminarCapacitacion);

export default router;
