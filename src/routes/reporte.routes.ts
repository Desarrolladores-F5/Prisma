import { Router } from 'express';
import {
  obtenerReportes,
  crearReporte,
  actualizarReporte,
  eliminarReporte,
  obtenerReportesDelUsuario, // ⬅️ importa la nueva función
} from '../controllers/reporte.controller';

import { validarToken } from '../middlewares/validarToken'; // ⬅️ protege la ruta con autenticación

const router = Router();

// 🔒 Ruta solo para reportes del usuario autenticado (trabajador)
router.get('/mis-reportes', validarToken, obtenerReportesDelUsuario);

// GET /api/reportes → todos los reportes (admin/supervisor)
router.get('/', obtenerReportes);

// POST /api/reportes
router.post('/', validarToken, crearReporte);

// PUT /api/reportes/:id
router.put('/:id', validarToken, actualizarReporte);

// DELETE /api/reportes/:id
router.delete('/:id', validarToken, eliminarReporte);

export default router;
