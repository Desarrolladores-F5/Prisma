// src/controllers/epp.controller.ts
import { Request, Response } from 'express';
import { EPP, Usuario, Faena } from '../models';
import { RequestConUsuario } from '../middlewares/validarToken';

// 🔐 Para administrador: obtener todos los EPP activos
export const obtenerEPP = async (_req: Request, res: Response) => {
  try {
    const registros = await EPP.findAll({
      where: { activo: true },
      include: [
        { model: Usuario, as: 'usuario', attributes: ['nombre', 'apellido'] },
        { model: Faena, as: 'faena', attributes: ['nombre'] },
      ],
    });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener EPP', error });
  }
};

// 🔐 Para administrador: crear nuevo EPP
export const crearEPP = async (req: Request, res: Response) => {
  try {
    const nuevo = await EPP.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear EPP', error });
  }
};

// 🔐 Para administrador: actualizar EPP por ID
export const actualizarEPP = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [actualizado] = await EPP.update(req.body, { where: { id } });

    if (actualizado) {
      const registro = await EPP.findByPk(id, {
        include: [
          { model: Usuario, as: 'usuario', attributes: ['nombre', 'apellido'] },
          { model: Faena, as: 'faena', attributes: ['nombre'] },
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

// 🔐 Para administrador: soft delete
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

// 🔐 Para trabajador: obtener solo sus propios EPP
export const obtenerEppDelUsuario = async (req: RequestConUsuario, res: Response): Promise<void> => {
  try {
    const usuario_id = req.usuario?.id;

    if (!usuario_id) {
      res.status(401).json({ mensaje: 'No autorizado' });
      return;
    }

    const registros = await EPP.findAll({
      where: { usuario_id, activo: true },
      include: [
        { model: Faena, as: 'faena', attributes: ['nombre'] },
        { model: Usuario, as: 'usuario', attributes: ['nombre', 'apellido'] },
      ],
    });

    res.json(registros);
  } catch (error) {
    console.error('❌ Error en obtenerEppDelUsuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener tus EPP asignados', error });
  }
};
