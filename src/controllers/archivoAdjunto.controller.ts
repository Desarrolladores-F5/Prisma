// src/controllers/archivoAdjunto.controller.ts
import { Request, Response } from 'express';
import { ArchivoAdjunto } from '../models';

export const obtenerArchivos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const archivos = await ArchivoAdjunto.findAll();
    res.json(archivos);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener archivos', error });
  }
};

export const crearArchivo = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevo = await ArchivoAdjunto.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear archivo', error });
  }
};

export const actualizarArchivo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [actualizado] = await ArchivoAdjunto.update(req.body, { where: { id } });

    if (actualizado) {
      const archivo = await ArchivoAdjunto.findByPk(id);
      res.json(archivo);
    } else {
      res.status(404).json({ mensaje: 'Archivo no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al actualizar archivo', error });
  }
};

export const eliminarArchivo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const eliminado = await ArchivoAdjunto.destroy({ where: { id } });

    if (eliminado) {
      res.json({ mensaje: '✅ Archivo eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Archivo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar archivo', error });
  }
};
