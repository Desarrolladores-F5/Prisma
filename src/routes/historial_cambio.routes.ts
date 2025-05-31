// src/routes/historial_cambio.routes.ts
import { Router } from 'express';
import { obtenerHistorialCambios, crearHistorialCambio } from '../controllers/historial_cambio.controller';
import { validarToken } from '../middlewares/validarToken';

const router = Router();

// Rutas protegidas con token
router.get('/', validarToken, obtenerHistorialCambios);
router.post('/', validarToken, crearHistorialCambio);

export default router; // ✅ Esto resuelve el error del import en server.ts
