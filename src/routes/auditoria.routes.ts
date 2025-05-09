import { Router } from 'express';
import {
  obtenerAuditorias,
  crearAuditoria,
  actualizarAuditoria,
  eliminarAuditoria
} from '../controllers/auditoria.controller';
import { validarToken, esAdministrador } from '../middlewares/validarToken'; // ✅ CORREGIDO

const router = Router();

router.get('/', validarToken, obtenerAuditorias);
router.post('/', validarToken, esAdministrador, crearAuditoria);
router.put('/:id', validarToken, esAdministrador, actualizarAuditoria);
router.delete('/:id', validarToken, esAdministrador, eliminarAuditoria);

export default router;
