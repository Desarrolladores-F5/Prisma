// src/controllers/upload.controller.ts
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Carpeta donde se guardarán los archivos
const storageDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir, { recursive: true });

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, storageDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombre = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    cb(null, `${nombre}-${timestamp}${ext}`);
  }
});

const upload = multer({ storage }).single('archivo');

// Middleware Express compatible
export const subirArchivo = (req: Request, res: Response) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ mensaje: '❌ Error al subir archivo (Multer)', error: err.message });
    } else if (err) {
      return res.status(500).json({ mensaje: '❌ Error inesperado al subir archivo', error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ mensaje: '❌ No se subió ningún archivo' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ mensaje: '✅ Archivo subido correctamente', url: fileUrl });
  });
};
