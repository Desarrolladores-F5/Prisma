import { Router } from 'express';
import { crearRol, listarRoles } from '../controllers/rol.controller';
import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

const router = Router();

router.get('/', validarToken, esAdministrador, listarRoles);
router.post('/', validarToken, esAdministrador, crearRol);

export default router;
