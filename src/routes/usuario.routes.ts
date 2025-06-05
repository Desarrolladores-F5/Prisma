import { Router } from 'express';
import {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
  contarUsuarios,
  reactivarUsuario // ✅ importar controlador nuevo
} from '../controllers/usuario.controller';

const router = Router();

// Rutas principales
router.get('/', obtenerUsuarios);               // GET /api/usuarios
router.post('/', crearUsuario);                 // POST /api/usuarios
router.delete('/:id', eliminarUsuario);         // DELETE lógico /api/usuarios/:id
router.put('/:id', actualizarUsuario);          // PUT /api/usuarios/:id
router.put('/reactivar/:id', reactivarUsuario); // ✅ nueva ruta para reactivar

// Rutas adicionales
router.get('/conteo/total', contarUsuarios);    // GET /api/usuarios/conteo/total

import { obtenerUsuariosPorFaena } from '../controllers/usuario.controller';
router.get('/faena/:faenaId', obtenerUsuariosPorFaena); // GET /api/usuarios/faena/:faenaId


export default router;
