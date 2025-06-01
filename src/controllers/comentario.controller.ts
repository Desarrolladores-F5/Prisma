// src/controllers/comentario.controller.ts
import { Request, Response } from 'express';
import { Comentario, Usuario } from '../models';

export const obtenerComentarios = async (_req: Request, res: Response) => {
  try {
    const comentarios = await Comentario.findAll({
      include: [
        {
          model: Usuario,
          as: 'autor',
          attributes: ['id', 'nombre', 'correo'],
          include: [
            {
              association: 'faena',
              attributes: ['id', 'nombre'],
            },
          ],
        },
      ],
      order: [['fecha', 'DESC']],
    });
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

export const obtenerComentariosPorEntidad = async (req: Request, res: Response) => {
  const { tipo, id } = req.params;

  try {
    const comentarios = await Comentario.findAll({
      where: {
        entidad_tipo: tipo,
        entidad_id: id,
      },
      include: [
        {
          model: Usuario,
          as: 'autor',
          attributes: ['id', 'nombre', 'correo'],
          include: [
            {
              association: 'faena',
              attributes: ['id', 'nombre'],
            },
          ],
        },
      ],
      order: [['fecha', 'DESC']],
    });
    res.json(comentarios);
  } catch (error) {
    console.error('❌ Error al obtener comentarios por entidad:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener comentarios por entidad', error });
  }
};
