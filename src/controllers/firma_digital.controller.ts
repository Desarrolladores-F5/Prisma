import { Request, Response } from 'express';
import { FirmaDigital } from '../models';

// Obtener todas las firmas digitales
export const obtenerFirmas = async (_req: Request, res: Response) => {
  try {
    const firmas = await FirmaDigital.findAll();
    res.json(firmas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener firmas digitales', error });
  }
};

// Crear una nueva firma digital
export const crearFirma = async (req: Request, res: Response) => {
  try {
    const nuevaFirma = await FirmaDigital.create(req.body);
    res.status(201).json(nuevaFirma);
  } catch (error) {
    res.status(400).json({ mensaje: '❌ Error al crear firma digital', error });
  }
};

// Eliminar una firma digital (opcional, puede ser lógico si se desea trazabilidad)
export const eliminarFirma = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eliminada = await FirmaDigital.destroy({ where: { id } });

    if (eliminada) {
      res.json({ mensaje: '✅ Firma eliminada correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Firma no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar firma digital', error });
  }
};
