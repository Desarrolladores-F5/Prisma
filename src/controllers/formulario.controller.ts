import { Request, Response } from 'express';
import { Formulario, Usuario } from '../models';

// Obtener todos los formularios activos con relación al creador
export const obtenerFormularios = async (_req: Request, res: Response) => {
  try {
    const formularios = await Formulario.findAll({
      where: { activo: true },
      include: [
        {
          model: Usuario,
          as: 'creador',
          attributes: ['id', 'nombre'],
        },
      ],
    });
    res.json(formularios);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener formularios', error });
  }
};

// Obtener un formulario por ID (para render dinámico)
export const obtenerFormularioPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const formulario = await Formulario.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'creador',
          attributes: ['id', 'nombre'],
        },
      ],
    });

    if (!formulario) {
      res.status(404).json({ mensaje: 'Formulario no encontrado' });
      return;
    }

    res.json(formulario);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener el formulario', error });
  }
};

// Crear un nuevo formulario
export const crearFormulario = async (req: Request, res: Response) => {
  try {
    const nuevo = await Formulario.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear formulario', error });
  }
};

// Actualizar un formulario
export const actualizarFormulario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [actualizado] = await Formulario.update(req.body, { where: { id } });

    if (actualizado) {
      const formulario = await Formulario.findByPk(id, {
        include: [
          {
            model: Usuario,
            as: 'creador',
            attributes: ['id', 'nombre'],
          },
        ],
      });
      res.json(formulario);
    } else {
      res.status(404).json({ mensaje: 'Formulario no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al actualizar formulario', error });
  }
};

// Eliminar (soft delete) un formulario
export const eliminarFormulario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [resultado] = await Formulario.update({ activo: false }, { where: { id } });

    if (resultado) {
      res.json({ mensaje: '✅ Formulario eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Formulario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar formulario', error });
  }
};
