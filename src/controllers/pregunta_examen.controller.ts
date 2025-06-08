// src/controllers/pregunta_examen.controller.ts
import { Request, Response } from 'express';
import { PreguntaExamen } from '../models';

// ✅ Obtener todas las preguntas de un examen específico
export const obtenerPreguntasPorExamen = async (req: Request, res: Response) => {
  const { examen_id } = req.params;

  try {
    const preguntas = await PreguntaExamen.findAll({
      where: { examen_id },
      order: [['id', 'ASC']],
    });
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener preguntas', error });
  }
};

// ✅ Crear una nueva pregunta
export const crearPregunta = async (req: Request, res: Response) => {
  const { examen_id, enunciado, alternativas, respuesta_correcta } = req.body;

  try {
    const nuevaPregunta = await PreguntaExamen.create({
      examen_id,
      enunciado,
      alternativas,
      respuesta_correcta,
      activo: true, // ✅ Agregado para cumplir con el modelo
    });
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al crear la pregunta', error });
  }
};

// ✅ Actualizar pregunta
export const actualizarPregunta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { enunciado, alternativas, respuesta_correcta } = req.body;

  try {
    const pregunta = await PreguntaExamen.findByPk(id);

    if (!pregunta) {
      return res.status(404).json({ mensaje: '❌ Pregunta no encontrada' });
    }

    await pregunta.update({ enunciado, alternativas, respuesta_correcta });
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar la pregunta', error });
  }
};

// ✅ Eliminar pregunta
export const eliminarPregunta = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pregunta = await PreguntaExamen.findByPk(id);

    if (!pregunta) {
      return res.status(404).json({ mensaje: '❌ Pregunta no encontrada' });
    }

    await pregunta.destroy();
    res.json({ mensaje: '✅ Pregunta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar la pregunta', error });
  }
};
