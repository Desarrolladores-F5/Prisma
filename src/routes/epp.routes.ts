import { Router } from 'express';
import {
  obtenerEPP,
  crearEPP,
  actualizarEPP,
  eliminarEPP,
} from '../controllers/epp.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// Listar EPP (requiere autenticación)
router.get('/', validarToken, obtenerEPP);

// Crear, editar y eliminar — solo administradores
router.post('/', validarToken, esAdministrador, crearEPP);
router.put('/:id', validarToken, esAdministrador, actualizarEPP);
router.delete('/:id', validarToken, esAdministrador, eliminarEPP);

export default router;
