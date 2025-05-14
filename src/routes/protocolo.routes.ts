import { Router } from 'express';
import {
  obtenerProtocolos,
  crearProtocolo,
  actualizarProtocolo,
  eliminarProtocolo,
} from '../controllers/protocolo.controller';

const router = Router();

router.get('/', obtenerProtocolos);
router.post('/', crearProtocolo);
router.put('/:id', actualizarProtocolo);
router.delete('/:id', eliminarProtocolo);

export default router;
