// src/routes/archivoAdjunto.routes.ts
import { Router } from "express";
import { subirArchivo } from "../controllers/upload.controller";
import { validarToken } from "../middlewares/validarToken";

const router = Router();

/**
 * POST /api/archivos
 * Subir archivo
 */
router.post("/", validarToken, subirArchivo);

export default router;