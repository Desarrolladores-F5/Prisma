import { Router } from 'express';
import {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
  contarUsuarios,
  reactivarUsuario,
  obtenerUsuariosPorFaena,
} from '../controllers/usuario.controller';

import { validarToken } from '../middlewares/validarToken';
import { autorizarRol } from '../middlewares/autorizarRol'; // Asegúrate que este está bien importado

const router = Router();

// 📊 Rutas GET accesibles por Administrador (1) y Supervisor (2)
router.get('/', validarToken, autorizarRol(1, 2), obtenerUsuarios);
router.get('/conteo/total', validarToken, autorizarRol(1, 2), contarUsuarios);
router.get('/faena/:faenaId', validarToken, autorizarRol(1, 2), obtenerUsuariosPorFaena);

// 🔐 Rutas protegidas solo para Administrador
router.post('/', validarToken, autorizarRol(1), crearUsuario);
router.delete('/:id', validarToken, autorizarRol(1), eliminarUsuario);
router.put('/:id', validarToken, autorizarRol(1), actualizarUsuario);
router.put('/reactivar/:id', validarToken, autorizarRol(1), reactivarUsuario);

export default router;
