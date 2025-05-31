// src/routes/estadistica.routes.ts

import { Router } from 'express';
import {
  obtenerEstadisticas,
  obtenerEstadisticaPorId,
  crearEstadistica,
  actualizarEstadistica,
  eliminarEstadistica,
  exportarEstadisticaPDF, // ✅ Importación añadida
} from '../controllers/estadistica.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// Rutas protegidas por autenticación y/o roles
router.get('/', validarToken, obtenerEstadisticas);
router.get('/:id', validarToken, obtenerEstadisticaPorId);
router.post('/', validarToken, esAdministrador, crearEstadistica);
router.put('/:id', validarToken, esAdministrador, actualizarEstadistica);
router.delete('/:id', validarToken, esAdministrador, eliminarEstadistica);

// ✅ Nueva ruta para exportar PDF
router.get('/:id/pdf', validarToken, exportarEstadisticaPDF);

export default router;
