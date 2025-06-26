import { Router } from 'express';
import {
  obtenerProtocolos,
  obtenerMisProtocolos,
  crearProtocolo,
  actualizarProtocolo,
  eliminarProtocolo,
} from '../controllers/protocolo.controller';

import { validarToken } from '../middlewares/validarToken';
import { autorizarRol } from '../middlewares/autorizarRol';

const router = Router();

// Ruta para Admin (1) y Supervisor (2): Obtener todos los protocolos
router.get('/', validarToken, autorizarRol(1, 2), obtenerProtocolos);

// Ruta para Trabajador (3): Obtener solo sus protocolos
router.get('/mis-protocolos', validarToken, autorizarRol(3), obtenerMisProtocolos);

// Solo Admin (1) puede crear, editar y eliminar protocolos
router.post('/', validarToken, autorizarRol(1), crearProtocolo);
router.put('/:id', validarToken, autorizarRol(1), actualizarProtocolo);
router.delete('/:id', validarToken, autorizarRol(1), eliminarProtocolo);

export default router;
