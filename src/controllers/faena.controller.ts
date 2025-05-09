import { Request, Response } from 'express';
import { Faena, Empresa, Usuario } from '../models';

export const obtenerFaenas = async (_req: Request, res: Response): Promise<void> => {
  try {
    const faenas = await Faena.findAll({
      where: { activo: true },
      include: [
        { model: Empresa, as: 'empresa', attributes: ['id', 'nombre'] },
        { model: Usuario, as: 'responsable', attributes: ['id', 'nombre', 'apellido'] }
      ]
    });
    res.json(faenas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener faenas', error });
  }
};

export const crearFaena = async (req: Request, res: Response): Promise<void> => {
  try {
    const nueva = await Faena.create({ ...req.body, activo: true });
    res.status(201).json({ mensaje: '✅ Faena creada', id: nueva.getDataValue('id') });
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al crear faena', error });
  }
};

export const actualizarFaena = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const faena = await Faena.findOne({ where: { id, activo: true } });
    if (!faena) {
      res.status(404).json({ mensaje: 'Faena no encontrada' });
      return;
    }

    await faena.update(req.body);
    res.json({ mensaje: '✅ Faena actualizada', id });
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar faena', error });
  }
};

export const eliminarFaena = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const faena = await Faena.findByPk(id);
    if (!faena) {
      res.status(404).json({ mensaje: 'Faena no encontrada' });
      return;
    }

    await faena.update({ activo: false });
    res.json({ mensaje: '✅ Faena eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar faena', error });
  }
};
