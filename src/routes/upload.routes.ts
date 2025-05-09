// src/routes/upload.routes.ts
import { Router } from 'express';
import { subirArchivo } from '../controllers/upload.controller';
import { validarToken } from '../middlewares/validarToken';

const router = Router();

router.post('/', validarToken, subirArchivo);

export default router;
