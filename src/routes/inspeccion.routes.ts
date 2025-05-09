import { Router } from 'express';
import {
  obtenerInspecciones,
  crearInspeccion,
  actualizarInspeccion,
  eliminarInspeccion,
} from '../controllers/inspeccion.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

router.get('/', validarToken, obtenerInspecciones);
router.post('/', validarToken, esAdministrador, crearInspeccion);
router.put('/:id', validarToken, esAdministrador, actualizarInspeccion);
router.delete('/:id', validarToken, esAdministrador, eliminarInspeccion);

export default router;
