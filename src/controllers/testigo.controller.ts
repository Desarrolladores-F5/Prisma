// src/controllers/testigo.controller.ts

import { Request, Response } from 'express';
import { Testigo, Empresa, Reporte } from '../models';

// ✅ Obtener todos los testigos activos
export const obtenerTestigos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const testigos = await Testigo.findAll({
      where: { activo: true },
      include: [
        { model: Empresa, as: 'empresa', attributes: ['id', 'nombre'] },
        { model: Reporte, as: 'reporte', attributes: ['id', 'titulo'] },
      ],
      order: [['fecha_creacion', 'DESC']],
    });
    res.json(testigos);
  } catch (error) {
    console.error('❌ Error al obtener testigos:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener testigos', error });
  }
};

// ✅ Obtener un testigo por ID
export const obtenerTestigoPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const testigo = await Testigo.findByPk(id, {
      include: [
        { model: Empresa, as: 'empresa', attributes: ['id', 'nombre'] },
        { model: Reporte, as: 'reporte', attributes: ['id', 'titulo'] },
      ],
    });

    if (!testigo || !testigo.activo) {
      res.status(404).json({ mensaje: '⚠️ Testigo no encontrado' });
      return;
    }

    res.json(testigo);
  } catch (error) {
    console.error('❌ Error al obtener testigo:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener testigo', error });
  }
};

// ✅ Crear un nuevo testigo
export const crearTestigo = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevo = await Testigo.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('❌ Error al crear testigo:', error);
    res.status(400).json({ mensaje: '❌ Error al crear testigo', error });
  }
};

// ✅ Actualizar un testigo existente
export const actualizarTestigo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [actualizado] = await Testigo.update(req.body, { where: { id } });

    if (actualizado) {
      const testigo = await Testigo.findByPk(id);
      res.json(testigo);
    } else {
      res.status(404).json({ mensaje: '⚠️ Testigo no encontrado' });
    }
  } catch (error) {
    console.error('❌ Error al actualizar testigo:', error);
    res.status(400).json({ mensaje: '❌ Error al actualizar testigo', error });
  }
};

// ✅ Eliminar (soft delete) un testigo
export const eliminarTestigo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [resultado] = await Testigo.update({ activo: false }, { where: { id } });

    if (resultado) {
      res.json({ mensaje: '✅ Testigo eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: '⚠️ Testigo no encontrado' });
    }
  } catch (error) {
    console.error('❌ Error al eliminar testigo:', error);
    res.status(500).json({ mensaje: '❌ Error al eliminar testigo', error });
  }
};
