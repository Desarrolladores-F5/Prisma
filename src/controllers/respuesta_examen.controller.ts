// src/controllers/respuesta_examen.controller.ts
import { Request, Response } from 'express';
import { RespuestaExamen } from '../models';

// ✅ Obtener todas las respuestas de un examen específico
export const obtenerRespuestasPorExamen = async (req: Request, res: Response) => {
  const { examen_id } = req.params;

  try {
    const respuestas = await RespuestaExamen.findAll({
      where: { examen_id },
      order: [['id', 'ASC']],
    });
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener respuestas', error });
  }
};

// ✅ Obtener todas las respuestas de un usuario para un examen
export const obtenerRespuestasPorUsuario = async (req: Request, res: Response) => {
  const { examen_id, usuario_id } = req.params;

  try {
    const respuestas = await RespuestaExamen.findAll({
      where: {
        examen_id,
        usuario_id,
      },
      order: [['id', 'ASC']],
    });
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener respuestas del usuario', error });
  }
};

// ✅ Crear una nueva respuesta
export const crearRespuesta = async (req: Request, res: Response) => {
  const { examen_id, pregunta_id, usuario_id, respuesta } = req.body;

  try {
    const nuevaRespuesta = await RespuestaExamen.create({
      examen_id,
      pregunta_id,
      usuario_id,
      respuesta_entregada: respuesta,
      correcta: false, // ✅ puedes ajustarlo si tienes la lógica de validación
    });

    res.status(201).json(nuevaRespuesta);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al guardar respuesta', error });
  }
};

// ✅ Actualizar una respuesta existente
export const actualizarRespuesta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { respuesta } = req.body;

  try {
    const respuestaEncontrada = await RespuestaExamen.findByPk(id);

    if (!respuestaEncontrada) {
      return res.status(404).json({ mensaje: '❌ Respuesta no encontrada' });
    }

    await respuestaEncontrada.update({
      respuesta_entregada: respuesta
    });

    res.json(respuestaEncontrada);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar respuesta', error });
  }
};

// ✅ Eliminar una respuesta
export const eliminarRespuesta = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const respuesta = await RespuestaExamen.findByPk(id);

    if (!respuesta) {
      return res.status(404).json({ mensaje: '❌ Respuesta no encontrada' });
    }

    await respuesta.destroy();
    res.json({ mensaje: '✅ Respuesta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar respuesta', error });
  }
};
