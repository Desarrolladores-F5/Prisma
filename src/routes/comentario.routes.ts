import { Router } from 'express';
import { obtenerComentarios, crearComentario } from '../controllers/comentario.controller';

const router = Router();

router.get('/', obtenerComentarios);
router.post('/', crearComentario);

export default router;
