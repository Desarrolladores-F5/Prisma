// src/controllers/formulario.controller.ts
import { Request, Response } from 'express';
import { Formulario, Usuario } from '../models';

// ✅ Obtener todos los formularios activos
export const obtenerFormularios = async (_req: Request, res: Response): Promise<void> => {
  try {
    const formularios = await Formulario.findAll({
      where: { activo: true },
      include: [{ model: Usuario, as: 'creador', attributes: ['id', 'nombre'] }],
    });
    res.json(formularios);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener formularios', error });
  }
};

// ✅ Obtener formulario por ID
export const obtenerFormularioPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const formulario = await Formulario.findByPk(id, {
      include: [{ model: Usuario, as: 'creador', attributes: ['id', 'nombre'] }],
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

// ✅ Crear nuevo formulario
export const crearFormulario = async (req: Request, res: Response): Promise<void> => {
  try {
    let { nombre, tipo, estructura_json, creador_id } = req.body;

    if (typeof estructura_json === 'string') {
      try {
        estructura_json = JSON.parse(estructura_json);
      } catch (error) {
        res.status(400).json({
          mensaje: '❌ El campo estructura_json debe ser un JSON válido',
          error,
        });
        return;
      }
    }

    const nuevo = await Formulario.create({
      nombre,
      tipo,
      estructura_json,
      creador_id,
      activo: true,
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear formulario', error });
  }
};

// ✅ Actualizar formulario
export const actualizarFormulario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    let { nombre, tipo, estructura_json, creador_id } = req.body;

    if (typeof estructura_json === 'string') {
      try {
        estructura_json = JSON.parse(estructura_json);
      } catch (error) {
        res.status(400).json({
          mensaje: '❌ El campo estructura_json debe ser un JSON válido',
          error,
        });
        return;
      }
    }

    const [actualizado] = await Formulario.update(
      { nombre, tipo, estructura_json, creador_id },
      { where: { id } }
    );

    if (actualizado) {
      const formulario = await Formulario.findByPk(id, {
        include: [{ model: Usuario, as: 'creador', attributes: ['id', 'nombre'] }],
      });
      res.json(formulario);
    } else {
      res.status(404).json({ mensaje: 'Formulario no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al actualizar formulario', error });
  }
};

// ✅ Eliminar formulario (soft delete)
export const eliminarFormulario = async (req: Request, res: Response): Promise<void> => {
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
