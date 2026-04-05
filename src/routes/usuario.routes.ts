// src/routes/usuario.routes.ts
import { Router } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

import * as UsuarioCtrl from '../controllers/usuario.controller';
import { validarToken } from '../middlewares/validarToken';
import { autorizarRol } from '../middlewares/autorizarRol';

const router = Router();

/** field -> subcarpeta en /uploads */
const fieldSubdir: Record<string, string> = {
  foto: 'fotos',
  firma: 'firmas',
};

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const subdir = fieldSubdir[file.fieldname] || 'otros';
    cb(null, path.join('uploads', subdir));
  },
  filename: (_req, file, cb) => {
    const ts = Date.now();
    const ext = (path.extname(file.originalname) || '').toLowerCase();
    cb(null, `${file.fieldname}_${ts}${ext}`);
  },
});

/** Solo JPG/PNG/WEBP */
const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const allowedExts  = ['.jpg', '.jpeg', '.png', '.webp'];

const fileFilter = (_req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
  const ext = (path.extname(file.originalname || '').toLowerCase());
  const okByMime = allowedMimes.includes(file.mimetype);
  const okByExt  = allowedExts.includes(ext);

  if (okByMime || okByExt) cb(null, true);
  else cb(new Error('Solo se permiten imágenes JPG, PNG o WEBP'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

const uploadFields = upload.fields([
  { name: 'firma', maxCount: 1 },
  { name: 'foto',  maxCount: 1 },
]);

/* =========================
   Rutas GET (Admin y Supervisor)
   ========================= */
router.get('/', validarToken, autorizarRol(1, 2), UsuarioCtrl.obtenerUsuarios);
router.get('/conteo/total', validarToken, autorizarRol(1, 2), UsuarioCtrl.contarUsuarios);
router.get('/faena/:faenaId', validarToken, autorizarRol(1, 2), UsuarioCtrl.obtenerUsuariosPorFaena);
router.get('/:id', validarToken, autorizarRol(1, 2), UsuarioCtrl.obtenerUsuarioPorId);

/* =========================
   Rutas POST / PUT / DELETE (solo Admin)
   ========================= */
router.post('/', validarToken, autorizarRol(1), uploadFields, UsuarioCtrl.crearUsuario);
router.put('/:id', validarToken, autorizarRol(1), uploadFields, UsuarioCtrl.actualizarUsuario);
router.put('/reactivar/:id', validarToken, autorizarRol(1), UsuarioCtrl.reactivarUsuario);
router.delete('/:id', validarToken, autorizarRol(1), UsuarioCtrl.eliminarUsuario);

export default router;
