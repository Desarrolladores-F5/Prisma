import { Router, Request, Response } from 'express';
import {
  obtenerPreguntasPorExamen,
  crearPregunta,
  actualizarPregunta,
  eliminarPregunta
} from '../controllers/pregunta_examen.controller';

const router = Router();

// Rutas para gestión de preguntas de examen 
router.get('/:examen_id', (req: Request, res: Response) => obtenerPreguntasPorExamen(req, res));
router.post('/', (req: Request, res: Response) => crearPregunta(req, res));
router.put('/:id', (req: Request, res: Response) => actualizarPregunta(req, res));
router.delete('/:id', (req: Request, res: Response) => eliminarPregunta(req, res));

export default router;
