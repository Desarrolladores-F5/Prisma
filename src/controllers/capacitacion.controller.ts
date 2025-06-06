// src/controllers/capacitacion.controller.ts
import { Request, Response } from 'express';
import { Capacitacion } from '../models';
import { Usuario } from '../models/usuario.model';
import { Faena } from '../models/faena.model';
import { Documento } from '../models/documento.model';

export const obtenerCapacitaciones = async (_req: Request, res: Response) => {
  try {
    const capacitaciones = await Capacitacion.findAll({
      where: { activo: true },
      include: [
        { model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'apellido'] },
        { model: Faena, as: 'faena', attributes: ['id', 'nombre'] },
        { model: Documento, as: 'documento', attributes: ['id', 'nombre', 'url'] },
      ]
    });
    res.json(capacitaciones);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener capacitaciones', error });
  }
};

export const crearCapacitacion = async (req: Request, res: Response) => {
  try {
    const nueva = await Capacitacion.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear capacitación', error });
  }
};

export const actualizarCapacitacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [actualizada] = await Capacitacion.update(req.body, { where: { id } });

    if (actualizada) {
      const actual = await Capacitacion.findByPk(id);
      res.json(actual);
    } else {
      res.status(404).json({ mensaje: 'Capacitación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar capacitación', error });
  }
};

export const eliminarCapacitacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [resultado] = await Capacitacion.update({ activo: false }, { where: { id } });

    if (resultado) {
      res.json({ mensaje: '✅ Capacitación eliminada correctamente (soft delete)' });
    } else {
      res.status(404).json({ mensaje: 'Capacitación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar capacitación', error });
  }
};

export const obtenerCapacitacionesDisponibles = async (_req: Request, res: Response) => {
  try {
    const capacitaciones = await Capacitacion.findAll({
      where: { activo: true },
      include: [
        { model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'apellido'] },
        { model: Faena, as: 'faena', attributes: ['id', 'nombre'] },
        { model: Documento, as: 'documento', attributes: ['id', 'nombre', 'url'] },
      ],
    });

    res.json(capacitaciones);
  } catch (error) {
    res.status(500).json({
      mensaje: '❌ Error al obtener capacitaciones disponibles para trabajadores',
      error,
    });
  }
};
