// src/controllers/medida_correctiva.controller.ts
import { Request, Response } from 'express';
import { MedidaCorrectiva, Usuario, Documento } from '../models';

// Obtener todas las medidas correctivas (con relaciones)
export const obtenerMedidas = async (_req: Request, res: Response) => {
  try {
    const medidas = await MedidaCorrectiva.findAll({
      include: [
        {
          model: Usuario,
          as: 'responsable',
          attributes: ['id', 'nombre'],
        },
        {
          model: Documento,
          as: 'documento_evidencia',
          attributes: ['id', 'nombre'],
        },
      ],
    });

    res.json(medidas);
  } catch (error) {
    console.error('❌ Error al obtener medidas:', error);
    res.status(500).json({ mensaje: 'Error al obtener medidas correctivas', error });
  }
};

// Crear una nueva medida correctiva
export const crearMedida = async (req: Request, res: Response) => {
  try {
    const nueva = await MedidaCorrectiva.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    console.error('❌ Error al crear medida:', error);
    res.status(400).json({ mensaje: 'Error al crear medida', error });
  }
};

// Actualizar medida correctiva
export const actualizarMedida = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [actualizada] = await MedidaCorrectiva.update(req.body, { where: { id } });

    if (actualizada) {
      const medida = await MedidaCorrectiva.findByPk(id, {
        include: [
          {
            model: Usuario,
            as: 'responsable',
            attributes: ['id', 'nombre'],
          },
          {
            model: Documento,
            as: 'documento_evidencia',
            attributes: ['id', 'nombre'],
          },
        ],
      });
      res.json(medida);
    } else {
      res.status(404).json({ mensaje: 'Medida no encontrada' });
    }
  } catch (error) {
    console.error('❌ Error al actualizar medida:', error);
    res.status(500).json({ mensaje: 'Error al actualizar medida', error });
  }
};

// Eliminar medida correctiva (soft delete o hard delete)
export const eliminarMedida = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eliminada = await MedidaCorrectiva.destroy({ where: { id } });

    if (eliminada) {
      res.json({ mensaje: '✅ Medida eliminada correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Medida no encontrada' });
    }
  } catch (error) {
    console.error('❌ Error al eliminar medida:', error);
    res.status(500).json({ mensaje: 'Error al eliminar medida', error });
  }
};
