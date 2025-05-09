import { Router } from 'express';
import {
  obtenerFirmas,
  crearFirma,
  eliminarFirma
} from '../controllers/firma_digital.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// Rutas protegidas
router.get('/', validarToken, obtenerFirmas);
router.post('/', validarToken, crearFirma); // puede firmar cualquier rol autenticado
router.delete('/:id', validarToken, esAdministrador, eliminarFirma); // solo admin puede eliminar

export default router;
