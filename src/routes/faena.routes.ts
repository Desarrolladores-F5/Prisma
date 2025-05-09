// src/routes/faena.routes.ts
import { Router } from 'express';
import {
  obtenerFaenas,
  crearFaena,
  actualizarFaena,
  eliminarFaena
} from '../controllers/faena.controller';
import { validarToken } from '../middlewares/validarToken'; 

const router = Router();

router.get('/', validarToken, obtenerFaenas);
router.post('/', validarToken, crearFaena);
router.put('/:id', validarToken, actualizarFaena);
router.delete('/:id', validarToken, eliminarFaena);

export default router;
