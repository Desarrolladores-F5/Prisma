// src/controllers/pregunta_examen.controller.ts
import { Request, Response } from 'express';
import { PreguntaExamen } from '../models';

// ✅ Obtener todas las preguntas de un examen específico
export const obtenerPreguntasPorExamen = async (req: Request, res: Response): Promise<void> => {
  const { examen_id } = req.params;

  try {
    const preguntas = await PreguntaExamen.findAll({
      where: { examen_id },
      order: [['id', 'ASC']],
    });
    res.json(preguntas);
  } catch (error: any) {
    console.error('❌ Error al obtener preguntas:', error.message);
    res.status(500).json({ mensaje: '❌ Error al obtener preguntas', error: error.message });
  }
};

// ✅ Crear una nueva pregunta
export const crearPregunta = async (req: Request, res: Response): Promise<void> => {
  const { examen_id, enunciado, alternativas, respuesta_correcta } = req.body;

  try {
    const nuevaPregunta = await PreguntaExamen.create({
      examen_id,
      enunciado,
      alternativas,
      respuesta_correcta,
      activo: true,
    });
    res.status(201).json(nuevaPregunta);
  } catch (error: any) {
    console.error('❌ Error al crear la pregunta:', error.message);
    res.status(500).json({ mensaje: '❌ Error al crear la pregunta', error: error.message });
  }
};

// ✅ Actualizar pregunta
export const actualizarPregunta = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { enunciado, alternativas, respuesta_correcta } = req.body;

  try {
    const pregunta = await PreguntaExamen.findByPk(id);

    if (!pregunta) {
      res.status(404).json({ mensaje: '❌ Pregunta no encontrada' });
      return;
    }

    await pregunta.update({ enunciado, alternativas, respuesta_correcta });
    res.json(pregunta);
  } catch (error: any) {
    console.error('❌ Error al actualizar la pregunta:', error.message);
    res.status(500).json({ mensaje: '❌ Error al actualizar la pregunta', error: error.message });
  }
};

// ✅ Eliminar pregunta
export const eliminarPregunta = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const pregunta = await PreguntaExamen.findByPk(id);

    if (!pregunta) {
      res.status(404).json({ mensaje: '❌ Pregunta no encontrada' });
      return;
    }

    await pregunta.destroy();
    res.json({ mensaje: '✅ Pregunta eliminada correctamente' });
  } catch (error: any) {
    console.error('❌ Error al eliminar la pregunta:', error.message);
    res.status(500).json({ mensaje: '❌ Error al eliminar la pregunta', error: error.message });
  }
};
