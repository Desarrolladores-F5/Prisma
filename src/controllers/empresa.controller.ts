// src/controllers/empresa.controller.ts
import { Request, Response } from 'express';
import { Empresa } from '../models';

// Obtener empresas
export const obtenerEmpresas = async (_req: Request, res: Response) => {
  try {
    const empresas = await Empresa.findAll({ where: { activo: true } });
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener empresas', error });
  }
};

// Crear empresa
export const crearEmpresa = async (req: Request, res: Response) => {
  try {
    const nuevaEmpresa = await Empresa.create(req.body);
    res.status(201).json(nuevaEmpresa);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al crear empresa', error });
  }
};

// Actualizar empresa
export const actualizarEmpresa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [actualizado] = await Empresa.update(req.body, { where: { id } });

    if (actualizado) {
      const empresaActualizada = await Empresa.findByPk(id);
      res.json(empresaActualizada); // ✅ sin return
    } else {
      res.status(404).json({ mensaje: 'Empresa no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar empresa', error });
  }
};

// Eliminar empresa (soft delete)
export const eliminarEmpresa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [actualizado] = await Empresa.update({ activo: false }, { where: { id } });

    if (actualizado) {
      res.json({ mensaje: '✅ Empresa eliminada correctamente (soft delete)' }); // ✅ sin return
    } else {
      res.status(404).json({ mensaje: 'Empresa no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar empresa', error });
  }
};
