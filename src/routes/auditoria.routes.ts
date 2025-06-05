import { Router } from 'express';
import {
  obtenerAuditorias,
  crearAuditoria,
  actualizarAuditoria,
  eliminarAuditoria
} from '../controllers/auditoria.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';
import { autorizarRol } from '../middlewares/autorizarRol'; 

const router = Router();

// 🔹 Permitir GET a roles 1 (admin) y 2 (supervisor)
router.get('/', validarToken, autorizarRol(1, 2), obtenerAuditorias);

// 🔐 Solo admin puede modificar
router.post('/', validarToken, esAdministrador, crearAuditoria);
router.put('/:id', validarToken, esAdministrador, actualizarAuditoria);
router.delete('/:id', validarToken, esAdministrador, eliminarAuditoria);

export default router;
