// src/routes/archivoAdjunto.routes.ts
import { Router } from 'express';
import {
  obtenerArchivos,
  crearArchivo,
  actualizarArchivo,
  eliminarArchivo
} from '../controllers/archivoAdjunto.controller';
import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

router.get('/', validarToken, obtenerArchivos);
router.post('/', validarToken, esAdministrador, crearArchivo);
router.put('/:id', validarToken, esAdministrador, actualizarArchivo);
router.delete('/:id', validarToken, esAdministrador, eliminarArchivo);

export default router;
