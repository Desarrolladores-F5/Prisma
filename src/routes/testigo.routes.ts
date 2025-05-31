import { Router } from 'express';
import {
  obtenerTestigos,
  obtenerTestigoPorId,
  crearTestigo,
  actualizarTestigo,
  eliminarTestigo,
} from '../controllers/testigo.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

router.get('/', validarToken, obtenerTestigos);
router.get('/:id', validarToken, obtenerTestigoPorId);
router.post('/', validarToken, esAdministrador, crearTestigo);
router.put('/:id', validarToken, esAdministrador, actualizarTestigo);
router.delete('/:id', validarToken, esAdministrador, eliminarTestigo);

export default router;
