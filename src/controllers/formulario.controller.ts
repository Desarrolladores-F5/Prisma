// src/controllers/formulario.controller.ts
import { Request, Response } from 'express';
import { Formulario, Usuario } from '../models';

// ✅ Obtener todos los formularios activos con relación al creador
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

// ✅ Obtener un formulario por ID
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
    let { nombre, tipo, estructura_json, creador_id } = req.body;

    // Validar JSON
    if (typeof estructura_json === 'string') {
      try {
        estructura_json = JSON.parse(estructura_json);
      } catch (error) {
        return res.status(400).json({
          mensaje: '❌ El campo estructura_json debe ser un JSON válido',
          error,
        });
      }
    }

    const nuevo = await Formulario.create({
      nombre,
      tipo,
      estructura_json,
      creador_id,
      activo: true, // ✅ Agregado para cumplir con el tipo requerido
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear formulario', error });
  }
};


// ✅ Actualizar formulario
export const actualizarFormulario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let { nombre, tipo, estructura_json, creador_id } = req.body;

    // Validar y transformar el campo estructura_json si es string
    if (typeof estructura_json === 'string') {
      try {
        estructura_json = JSON.parse(estructura_json);
      } catch (error) {
        return res.status(400).json({
          mensaje: '❌ El campo estructura_json debe ser un JSON válido',
          error,
        });
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

// ✅ Eliminar (soft delete)
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
