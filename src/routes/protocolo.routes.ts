import { Router } from 'express';
import {
  obtenerProtocolos,
  crearProtocolo,
  actualizarProtocolo,
  eliminarProtocolo,
} from '../controllers/protocolo.controller';

import { validarToken } from '../middlewares/validarToken';
import { autorizarRol } from '../middlewares/autorizarRol';

const router = Router();

// Lectura permitida a Admin (1) y Supervisor (2)
router.get('/', validarToken, autorizarRol(1, 2), obtenerProtocolos);

// Solo Admin puede modificar
router.post('/', validarToken, autorizarRol(1), crearProtocolo);
router.put('/:id', validarToken, autorizarRol(1), actualizarProtocolo);
router.delete('/:id', validarToken, autorizarRol(1), eliminarProtocolo);

export default router;
