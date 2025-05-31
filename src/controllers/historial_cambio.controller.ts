// src/controllers/historial_cambio.controller.ts
import { Request, Response } from 'express';
import { HistorialCambio, Usuario } from '../models';
import { RequestConUsuario } from '../middlewares/validarToken';

export const obtenerHistorialCambios = async (
  req: RequestConUsuario,
  res: Response
): Promise<void> => {
  try {
    const cambios = await HistorialCambio.findAll({
      include: [{ model: Usuario, as: 'usuario', attributes: ['id', 'nombre'] }],
      order: [['timestamp', 'DESC']],
    });

    res.json(cambios);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener historial de cambios', error });
  }
};

export const crearHistorialCambio = async (
  req: RequestConUsuario,
  res: Response
): Promise<void> => {
  try {
    const { entidad_tipo, entidad_id, accion, detalles } = req.body;

    const nuevoCambio = await HistorialCambio.create({
      entidad_tipo,
      entidad_id,
      accion,
      detalles,
      usuario_id: req.usuario.id,
    });

    res.status(201).json(nuevoCambio);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al crear historial de cambio', error });
  }
};
