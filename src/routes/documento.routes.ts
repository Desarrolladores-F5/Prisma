import { Router } from 'express';
import {
  obtenerDocumentos,
  crearDocumento,
  actualizarDocumento,
  eliminarDocumento,
} from '../controllers/documento.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

// Listar documentos (requiere estar autenticado)
router.get('/', validarToken, obtenerDocumentos);

// Crear, actualizar y eliminar documentos — solo administrador
router.post('/', validarToken, esAdministrador, crearDocumento);
router.put('/:id', validarToken, esAdministrador, actualizarDocumento);
router.delete('/:id', validarToken, esAdministrador, eliminarDocumento);

export default router;
