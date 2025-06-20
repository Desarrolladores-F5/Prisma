// src/controllers/respuesta_formulario.controller.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RespuestaFormulario, Usuario } from '../models';

// ✅ Crear una nueva respuesta de formulario
export const crearRespuestaFormulario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { formulario_id, respuestas_json } = req.body;

    if (!formulario_id || !respuestas_json) {
      res.status(400).json({ mensaje: '❌ formulario_id y respuestas_json son obligatorios.' });
      return;
    }

    const token = req.headers.authorization?.split(' ')[1];
    let usuario_id: number | undefined;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_prisma') as any;
        usuario_id = decoded?.id;
      } catch (err) {
        console.error('❌ Token inválido al registrar respuesta:', err);
        res.status(401).json({ mensaje: '❌ Token inválido' });
        return;
      }
    }

    const nueva = await RespuestaFormulario.create({
      formulario_id,
      usuario_id,
      respuestas_json,
    });

    res.status(201).json({
      mensaje: '✅ Respuesta registrada correctamente.',
      id: nueva.id,
    });
  } catch (error) {
    console.error('❌ Error al guardar la respuesta:', error);
    res.status(500).json({ mensaje: '❌ Error al guardar la respuesta del formulario.', error });
  }
};

// ✅ Obtener todas las respuestas activas
export const obtenerRespuestasFormulario = async (_req: Request, res: Response): Promise<void> => {
  try {
    const respuestas = await RespuestaFormulario.findAll({
      where: { activo: true },
    });
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener respuestas', error });
  }
};

// ✅ Obtener respuestas por formulario_id con nombre del usuario
export const obtenerRespuestasPorFormulario = async (req: Request, res: Response): Promise<void> => {
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
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'apellido'],
        },
      ],
      order: [['fecha_respuesta', 'DESC']],
    });

    res.json(respuestas);
  } catch (error) {
    console.error('❌ Error al obtener respuestas por formulario:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener respuestas', error });
  }
};

// ✅ Obtener una respuesta específica por ID con datos del usuario
export const obtenerRespuestaPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const respuesta = await RespuestaFormulario.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'apellido'],
        },
      ],
    });

    if (!respuesta) {
      res.status(404).json({ mensaje: '❌ Respuesta no encontrada' });
      return;
    }

    res.json(respuesta);
  } catch (error) {
    console.error('❌ Error al obtener la respuesta por ID:', error);
    res.status(500).json({ mensaje: '❌ Error interno del servidor' });
  }
};

// ✅ Obtener respuestas del formulario solo del usuario autenticado (supervisor)
export const obtenerMisRespuestasFormulario = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ mensaje: '❌ Token no proporcionado' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_prisma') as any;
    const usuario_id = decoded?.id;

    if (!usuario_id) {
      res.status(401).json({ mensaje: '❌ Usuario no autenticado' });
      return;
    }

    const respuestas = await RespuestaFormulario.findAll({
      where: {
        usuario_id,
        activo: true,
      },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'apellido'],
        },
      ],
      order: [['fecha_respuesta', 'DESC']],
    });

    res.json(respuestas);
  } catch (error) {
    console.error('❌ Error al obtener respuestas del usuario:', error);
    res.status(500).json({ mensaje: '❌ Error interno del servidor' });
  }
};
