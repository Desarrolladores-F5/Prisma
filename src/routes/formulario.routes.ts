import { Router } from 'express';
import {
  obtenerFormularios,
  obtenerFormularioPorId,
  crearFormulario,
  actualizarFormulario,
  eliminarFormulario,
  obtenerFormulariosParaTrabajador,
} from '../controllers/formulario.controller';

import { validarToken } from '../middlewares/validarToken';
import { esAdministrador } from '../middlewares/roles';

// Este middleware permite restringir acceso por rol_id
const autorizarRol = (rolPermitido: number) => {
  return (req: any, res: any, next: any) => {
    if (req.usuario?.rol_id !== rolPermitido) {
      return res.status(403).json({ mensaje: 'Acceso no autorizado' });
    }
    next();
  };
};

const router = Router();

// 🔹 Ruta para trabajadores: formularios disponibles para ellos
router.get('/mis-formularios', validarToken, autorizarRol(3), obtenerFormulariosParaTrabajador);

// 🔹 Rutas generales de administración
router.get('/', validarToken, obtenerFormularios);
router.post('/', validarToken, esAdministrador, crearFormulario);
router.put('/:id', validarToken, esAdministrador, actualizarFormulario);
router.delete('/:id', validarToken, esAdministrador, eliminarFormulario);
router.get('/:id', validarToken, obtenerFormularioPorId);

export default router;
