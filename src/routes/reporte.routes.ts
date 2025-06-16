import { Router } from 'express';
import {
  obtenerReportes,
  crearReporte,
  actualizarReporte,
  eliminarReporte,
  obtenerReportesDelUsuario,
} from '../controllers/reporte.controller';

import { validarToken } from '../middlewares/validarToken';
import { autorizarRol } from '../middlewares/autorizarRol';

const router = Router();

// 🔐 Ruta para reportes del usuario autenticado (trabajador)
router.get('/mis-reportes', validarToken, autorizarRol(2,3), obtenerReportesDelUsuario);

// 🔐 Ruta para obtener todos los reportes (admin y supervisor)
router.get('/', validarToken, autorizarRol(1, 2), obtenerReportes);

// 🔐 Crear nuevo reporte (puede estar disponible para 2 y/o 3)
router.post('/', validarToken, autorizarRol(1, 2, 3), crearReporte);

// 🔐 Actualizar y eliminar (podrías dejar solo admin o supervisor también)
router.put('/:id', validarToken, autorizarRol(1, 2), actualizarReporte);
router.delete('/:id', validarToken, autorizarRol(1), eliminarReporte);

export default router;
