import { Request, Response } from 'express';
import { Comentario } from '../models';

export const obtenerComentarios = async (_req: Request, res: Response) => {
  try {
    const comentarios = await Comentario.findAll();
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener comentarios', error });
  }
};

export const crearComentario = async (req: Request, res: Response) => {
  try {
    const nuevo = await Comentario.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al crear comentario', error });
  }
};
