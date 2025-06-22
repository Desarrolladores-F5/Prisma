import { Router } from 'express';
import multer from 'multer';
import path from 'path';

import {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
  contarUsuarios,
  reactivarUsuario,
  obtenerUsuariosPorFaena,
  obtenerUsuarioPorId, 
} from '../controllers/usuario.controller';

import { validarToken } from '../middlewares/validarToken';
import { autorizarRol } from '../middlewares/autorizarRol';

const router = Router();

// 🖼️ Configuración de multer para firma
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/firmas');
  },
  filename: function (_req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `firma_${timestamp}${ext}`);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes PNG o JPG'), false);
  }
};

const upload = multer({ storage, fileFilter });

/* =========================
   📊 Rutas GET (Admin y Supervisor)
   ========================= */
router.get('/', validarToken, autorizarRol(1, 2), obtenerUsuarios);
router.get('/conteo/total', validarToken, autorizarRol(1, 2), contarUsuarios);
router.get('/faena/:faenaId', validarToken, autorizarRol(1, 2), obtenerUsuariosPorFaena);
router.get('/:id', validarToken, autorizarRol(1, 2), obtenerUsuarioPorId); // ✅ nueva ruta

/* =========================
   🔐 Rutas POST / PUT / DELETE (solo Admin)
   ========================= */
router.post('/', validarToken, autorizarRol(1), upload.single('firma'), crearUsuario);
router.put('/:id', validarToken, autorizarRol(1), upload.single('firma'), actualizarUsuario);
router.put('/reactivar/:id', validarToken, autorizarRol(1), reactivarUsuario);
router.delete('/:id', validarToken, autorizarRol(1), eliminarUsuario);

export default router;
