import { Request, Response } from 'express';
import { Inspeccion } from '../models';

// Obtener todas las inspecciones activas con relaciones
export const obtenerInspecciones = async (_req: Request, res: Response) => {
  try {
    const inspecciones = await Inspeccion.findAll({
      where: { activo: true },
      include: [
        { association: 'faena' },
        { association: 'inspector' }
      ]
    });
    res.json(inspecciones);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener inspecciones', error });
  }
};


// Crear una nueva inspección
export const crearInspeccion = async (req: Request, res: Response) => {
  try {
    const nueva = await Inspeccion.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear inspección', error });
  }
};

// Actualizar una inspección
export const actualizarInspeccion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [actualizada] = await Inspeccion.update(req.body, { where: { id } });

    if (actualizada) {
      const inspeccion = await Inspeccion.findByPk(id);
      res.json(inspeccion);
    } else {
      res.status(404).json({ mensaje: 'Inspección no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al actualizar inspección', error });
  }
};

// Eliminar (soft delete) una inspección
export const eliminarInspeccion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [resultado] = await Inspeccion.update({ activo: false }, { where: { id } });

    if (resultado) {
      res.json({ mensaje: '✅ Inspección eliminada correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Inspección no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar inspección', error });
  }
};
