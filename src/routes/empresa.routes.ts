// src/routes/empresa.routes.ts
import { Router } from 'express';
import {
  obtenerEmpresas,
  crearEmpresa,
  actualizarEmpresa,
  eliminarEmpresa
} from '../controllers/empresa.controller';
import { validarToken } from '../middlewares/validarToken';

const router = Router();

// Obtener todas las empresas
router.get('/', validarToken, obtenerEmpresas);

// Crear nueva empresa
router.post('/', validarToken, crearEmpresa);

// Actualizar empresa por ID
router.put('/:id', validarToken, actualizarEmpresa);

// Eliminar empresa por ID (soft delete)
router.delete('/:id', validarToken, eliminarEmpresa);

export default router;
