import { Router } from 'express';
import {
  obtenerEPP,
  crearEPP,
  actualizarEPP,
  eliminarEPP,
  obtenerEppDelUsuario, // nuevo nombre estandarizado
} from '../controllers/epp.controller';

import { validarToken } from '../middlewares/validarToken';
import { autorizarRol } from '../middlewares/autorizarRol';

const router = Router();

// 🔐 EPP asignados al usuario autenticado (solo trabajadores)
router.get('/mis-epp', validarToken, autorizarRol(3), obtenerEppDelUsuario);

// 🔐 Gestión completa de EPP (solo administradores)
router.get('/', validarToken, autorizarRol(1), obtenerEPP);
router.post('/', validarToken, autorizarRol(1), crearEPP);
router.put('/:id', validarToken, autorizarRol(1), actualizarEPP);
router.delete('/:id', validarToken, autorizarRol(1), eliminarEPP);

export default router;
