import { Router } from 'express';
import {
  obtenerReportes,
  crearReporte,
  actualizarReporte,
  eliminarReporte,
} from '../controllers/reporte.controller';

const router = Router();

// GET /api/reportes
router.get('/', obtenerReportes);

// POST /api/reportes
router.post('/', crearReporte);

// PUT /api/reportes/:id
router.put('/:id', actualizarReporte);

// DELETE /api/reportes/:id
router.delete('/:id', eliminarReporte);

export default router;
