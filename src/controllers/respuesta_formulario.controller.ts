import { Request, Response } from 'express';
import { RespuestaFormulario } from '../models';

// Crear una nueva respuesta de formulario
export const crearRespuestaFormulario = async (req: Request, res: Response) => {
  try {
    const { formulario_id, usuario_id, respuestas_json } = req.body;

    if (!formulario_id || !respuestas_json) {
      res.status(400).json({ mensaje: '❌ formulario_id y respuestas_json son obligatorios.' });
      return;
    }

    const nueva = await RespuestaFormulario.create({
      formulario_id,
      usuario_id: usuario_id || null,
      respuestas_json,
    });

    res.status(201).json(nueva);
  } catch (error) {
    console.error('❌ Error al guardar la respuesta:', error);
    res.status(500).json({ mensaje: '❌ Error al guardar la respuesta del formulario.', error });
  }
};

// Obtener todas las respuestas activas
export const obtenerRespuestasFormulario = async (_req: Request, res: Response) => {
  try {
    const respuestas = await RespuestaFormulario.findAll({
      where: { activo: true },
    });
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener respuestas', error });
  }
};

// Obtener respuestas por formulario_id (nuevo)
export const obtenerRespuestasPorFormulario = async (req: Request, res: Response) => {
  try {
    const { formulario_id } = req.query;

    if (!formulario_id) {
      res.status(400).json({ mensaje: '⚠️ Debes proporcionar un formulario_id como query param' });
      return;
    }

    const respuestas = await RespuestaFormulario.findAll({
      where: {
        formulario_id: Number(formulario_id),
        activo: true,
      },
      order: [['fecha_respuesta', 'DESC']],
    });

    res.json(respuestas);
  } catch (error) {
    console.error('❌ Error al obtener respuestas por formulario:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener respuestas', error });
  }
};
