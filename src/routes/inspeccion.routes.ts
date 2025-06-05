// src/routes/inspeccion.routes.ts

import { Router } from 'express';
import {
  obtenerInspecciones,
  crearInspeccion,
  actualizarInspeccion,
  eliminarInspeccion,
} from '../controllers/inspeccion.controller';

import { validarToken } from '../middlewares/validarToken';
import { autorizarRol } from '../middlewares/autorizarRol';

const router = Router();

// 🔹 Visualización permitida para Administradores (1) y Supervisores (2)
router.get('/', validarToken, autorizarRol(1, 2), obtenerInspecciones);

// 🔐 Modificaciones exclusivas del Administrador
router.post('/', validarToken, autorizarRol(1, 2), crearInspeccion);
router.put('/:id', validarToken, autorizarRol(1), actualizarInspeccion);
router.delete('/:id', validarToken, autorizarRol(1), eliminarInspeccion);

export default router;
