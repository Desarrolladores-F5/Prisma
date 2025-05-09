// src/controllers/documento.controller.ts
import { Request, Response } from 'express';
import { Documento } from '../models';

// Obtener todos los documentos activos
export const obtenerDocumentos = async (_req: Request, res: Response) => {
  try {
    const registros = await Documento.findAll({ where: { activo: true } });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener documentos', error });
  }
};

// Crear un nuevo documento
export const crearDocumento = async (req: Request, res: Response) => {
  try {
    const { nombre, tipo, url, version, activo } = req.body;

    if (!nombre || !tipo || !url || !version) {
      return res.status(400).json({ mensaje: '❌ Faltan campos requeridos' });
    }

    if (!url.startsWith('/uploads/')) {
      return res.status(400).json({ mensaje: '❌ La URL del archivo debe comenzar con /uploads/' });
    }

    const nuevo = await Documento.create({ nombre, tipo, url, version, activo });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear documento', error });
  }
};

// Actualizar un documento
export const actualizarDocumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, url, version, activo } = req.body;

    if (!nombre || !tipo || !url || !version) {
      return res.status(400).json({ mensaje: '❌ Faltan campos requeridos' });
    }

    if (!url.startsWith('/uploads/')) {
      return res.status(400).json({ mensaje: '❌ La URL del archivo debe comenzar con /uploads/' });
    }

    const [actualizado] = await Documento.update({ nombre, tipo, url, version, activo }, { where: { id } });

    if (actualizado) {
      const documento = await Documento.findByPk(id);
      res.json(documento);
    } else {
      res.status(404).json({ mensaje: 'Documento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar documento', error });
  }
};

// Eliminar (soft delete) un documento
export const eliminarDocumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [resultado] = await Documento.update({ activo: false }, { where: { id } });

    if (resultado) {
      res.json({ mensaje: '✅ Documento eliminado correctamente (soft delete)' });
    } else {
      res.status(404).json({ mensaje: 'Documento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar documento', error });
  }
};
