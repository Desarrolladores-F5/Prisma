// src/controllers/firma_digital.controller.ts
import { Request, Response } from 'express';
import { FirmaDigital, RespuestaFormulario } from '../models';

// ✅ Obtener todas las firmas digitales
export const obtenerFirmas = async (_req: Request, res: Response): Promise<void> => {
  try {
    const firmas = await FirmaDigital.findAll();
    res.json(firmas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener firmas digitales', error });
  }
};

// ✅ Crear una nueva firma digital con soporte para imagen
export const crearFirma = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      res.status(400).json({ mensaje: '❌ Body inválido: no se recibió información' });
      return;
    }

    const {
      firmante_id,
      hash_firma,
      tipo_firma,
      metadata,
      firma_imagen_url // ✅ Nuevo campo opcional para imagen visible
    } = req.body;

    // Validación de campos obligatorios
    if (!firmante_id || !hash_firma || !tipo_firma) {
      res.status(400).json({
        mensaje: '❌ Campos requeridos faltantes (firmante_id, hash_firma o tipo_firma)'
      });
      return;
    }

    console.log('📥 Datos de firma recibidos:', {
      firmante_id,
      hash_firma,
      tipo_firma,
      metadata,
      firma_imagen_url
    });

    // Crear la firma
    const nuevaFirma = await FirmaDigital.create({
      firmante_id,
      hash_firma,
      tipo_firma,
      metadata,
      firma_imagen_url,
      fecha: new Date(),
    });

    // Actualizar estado de respuesta_formulario si aplica
    if (metadata?.entidad === 'respuesta_formulario' && metadata?.entidad_id) {
      const resultado = await RespuestaFormulario.update(
        { estado_firma: 'firmado' },
        { where: { id: metadata.entidad_id } }
      );

      if (resultado[0] > 0) {
        console.log(`✅ RespuestaFormulario ID ${metadata.entidad_id} actualizada`);
      } else {
        console.warn(`⚠️ No se encontró RespuestaFormulario con ID ${metadata.entidad_id}`);
      }
    }

    res.status(201).json(nuevaFirma);
  } catch (error) {
    console.error('❌ Error en crearFirma:', error);
    res.status(400).json({ mensaje: '❌ Error al crear firma digital', error });
  }
};

// ✅ Eliminar una firma digital
export const eliminarFirma = async (req: Request, res: Response): Promise<void> => {
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
