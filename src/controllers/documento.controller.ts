// src/controllers/documento.controller.ts
import { Request, Response } from 'express';
import { Documento } from '../models';

// Obtener todos los documentos activos
export const obtenerDocumentos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const registros = await Documento.findAll({ where: { activo: true } });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener documentos', error });
  }
};

// Crear un nuevo documento (incluye usuario_id desde token)
export const crearDocumento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, tipo, url, version, activo } = req.body;
    const usuario_id = (req as any).usuario?.id;

    if (!usuario_id) {
      res.status(401).json({ mensaje: '❌ Usuario no autenticado' });
      return;
    }

    if (!nombre || !tipo || !url || !version) {
      res.status(400).json({ mensaje: '❌ Faltan campos requeridos' });
      return;
    }

    if (!url.startsWith('/uploads/')) {
      res.status(400).json({ mensaje: '❌ La URL del archivo debe comenzar con /uploads/' });
      return;
    }

    const nuevo = await Documento.create({ nombre, tipo, url, version, activo, usuario_id });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear documento', error });
  }
};

// Actualizar un documento
export const actualizarDocumento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, tipo, url, version, activo } = req.body;

    if (!nombre || !tipo || !url || !version) {
      res.status(400).json({ mensaje: '❌ Faltan campos requeridos' });
      return;
    }

    if (!url.startsWith('/uploads/')) {
      res.status(400).json({ mensaje: '❌ La URL del archivo debe comenzar con /uploads/' });
      return;
    }

    const [actualizado] = await Documento.update(
      { nombre, tipo, url, version, activo },
      { where: { id } }
    );

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
export const eliminarDocumento = async (req: Request, res: Response): Promise<void> => {
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

// Obtener documentos del usuario autenticado
export const obtenerMisDocumentos = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = (req as any).usuario?.id;

    if (!usuarioId) {
      res.status(401).json({ mensaje: '❌ Usuario no autenticado' });
      return;
    }

    const documentos = await Documento.findAll({
      where: {
        usuario_id: usuarioId,
        activo: true,
      },
    });

    res.json(documentos);
  } catch (error) {
    console.error('❌ Error al obtener mis documentos:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener documentos del usuario', error });
  }
};
