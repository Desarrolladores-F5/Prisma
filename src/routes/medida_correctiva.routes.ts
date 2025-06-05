import { Router } from 'express';
import {
  obtenerMedidas,
  crearMedida,
  actualizarMedida,
  eliminarMedida,
} from '../controllers/medida_correctiva.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';
import { autorizarRol } from '../middlewares/autorizarRol';

const router = Router();

// 🔹 Visualización permitida para Administradores (1) y Supervisores (2)
router.get('/', validarToken, autorizarRol(1, 2), obtenerMedidas);

// 🔐 Modificaciones exclusivas del Administrador
router.post('/', validarToken, esAdministrador, crearMedida);
router.put('/:id', validarToken, esAdministrador, actualizarMedida);
router.delete('/:id', validarToken, esAdministrador, eliminarMedida);

export default router;
