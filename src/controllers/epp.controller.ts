// src/controllers/epp.controller.ts
import { Request, Response } from 'express';
import { EPP, Usuario, Faena } from '../models';

export const obtenerEPP = async (_req: Request, res: Response) => {
  try {
    const registros = await EPP.findAll({
      where: { activo: true },
      include: [
        { model: Usuario, as: 'usuario', attributes: ['nombre', 'apellido'] },
        { model: Faena, as: 'faena', attributes: ['nombre'] }
      ],
    });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener EPP', error });
  }
};

export const crearEPP = async (req: Request, res: Response) => {
  try {
    const nuevo = await EPP.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear EPP', error });
  }
};

export const actualizarEPP = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [actualizado] = await EPP.update(req.body, { where: { id } });

    if (actualizado) {
      const registro = await EPP.findByPk(id, {
        include: [
          { model: Usuario, as: 'usuario', attributes: ['nombre', 'apellido'] },
          { model: Faena, as: 'faena', attributes: ['nombre'] }
        ],
      });
      res.json(registro);
    } else {
      res.status(404).json({ mensaje: 'EPP no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar EPP', error });
  }
};

export const eliminarEPP = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [resultado] = await EPP.update({ activo: false }, { where: { id } });

    if (resultado) {
      res.json({ mensaje: '✅ EPP eliminado correctamente (soft delete)' });
    } else {
      res.status(404).json({ mensaje: 'EPP no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar EPP', error });
  }
};
