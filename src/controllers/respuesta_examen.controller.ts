// src/controllers/respuesta_examen.controller.ts
import { Request, Response } from 'express';
import { RespuestaExamen, PreguntaExamen } from '../models';

// Obtener todas las respuestas de un examen específico
export const obtenerRespuestasPorExamen = async (req: Request, res: Response): Promise<void> => {
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

// Obtener todas las respuestas de un usuario para un examen
export const obtenerRespuestasPorUsuario = async (req: Request, res: Response): Promise<void> => {
  const { examen_id, usuario_id } = req.params;

  try {
    const respuestas = await RespuestaExamen.findAll({
      where: { examen_id, usuario_id },
      order: [['id', 'ASC']],
    });
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener respuestas del usuario', error });
  }
};

// Crear una nueva respuesta con validación automática
export const crearRespuesta = async (req: Request, res: Response): Promise<void> => {
  const { examen_id, pregunta_id, usuario_id, respuesta } = req.body;

  try {
    const pregunta = await PreguntaExamen.findByPk(pregunta_id);

    if (!pregunta) {
      res.status(404).json({ mensaje: '❌ Pregunta no encontrada' });
      return;
    }

    const esCorrecta = pregunta.respuesta_correcta === String(respuesta);

    const nuevaRespuesta = await RespuestaExamen.create({
      examen_id,
      pregunta_id,
      usuario_id,
      respuesta_entregada: respuesta,
      correcta: esCorrecta,
    });

    res.status(201).json(nuevaRespuesta);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al guardar respuesta', error });
  }
};

// Actualizar una respuesta existente
export const actualizarRespuesta = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { respuesta } = req.body;

  try {
    const respuestaEncontrada = await RespuestaExamen.findByPk(id);

    if (!respuestaEncontrada) {
      res.status(404).json({ mensaje: '❌ Respuesta no encontrada' });
      return;
    }

    const pregunta = await PreguntaExamen.findByPk(respuestaEncontrada.pregunta_id);

    if (!pregunta) {
      res.status(404).json({ mensaje: '❌ Pregunta no encontrada' });
      return;
    }

    const esCorrecta = pregunta.respuesta_correcta === String(respuesta);

    await respuestaEncontrada.update({
      respuesta_entregada: respuesta,
      correcta: esCorrecta,
    });

    res.json(respuestaEncontrada);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar respuesta', error });
  }
};

// Eliminar una respuesta
export const eliminarRespuesta = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const respuesta = await RespuestaExamen.findByPk(id);

    if (!respuesta) {
      res.status(404).json({ mensaje: '❌ Respuesta no encontrada' });
      return;
    }

    await respuesta.destroy();
    res.json({ mensaje: '✅ Respuesta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar respuesta', error });
  }
};
