import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/firmas/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombreArchivo = `firma_${Date.now()}${ext}`;
    cb(null, nombreArchivo);
  },
});

export const subirFirma = multer({ storage });
