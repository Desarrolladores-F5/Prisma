import { Router } from 'express';
import {
  obtenerMedidas,
  crearMedida,
  actualizarMedida,
  eliminarMedida,
} from '../controllers/medida_correctiva.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// Rutas protegidas
router.get('/', validarToken, obtenerMedidas);
router.post('/', validarToken, esAdministrador, crearMedida);
router.put('/:id', validarToken, esAdministrador, actualizarMedida);
router.delete('/:id', validarToken, esAdministrador, eliminarMedida);

export default router;
