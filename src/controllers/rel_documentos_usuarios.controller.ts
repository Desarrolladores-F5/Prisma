// src/controllers/rel_documentos_usuarios.controller.ts

import { Request, Response } from 'express';
import { RelDocumentoUsuario, Usuario, Documento } from '../models';

// ✅ Asignar documento (uno o múltiples usuarios)
export const asignarDocumentoAUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { documento_id, asignacion_tipo, rol_id, usuario_ids } = req.body;

    if (!documento_id || !asignacion_tipo) {
      res.status(400).json({ mensaje: 'Faltan parámetros requeridos.' });
      return;
    }

    if (asignacion_tipo === 'todos' || asignacion_tipo === 'rol') {
      if (!rol_id) {
        res.status(400).json({ mensaje: 'Debe especificar un rol para la asignación.' });
        return;
      }

      const usuarios = await Usuario.findAll({
        where: {
          activo: true,
          rol_id: rol_id,
        },
      });

      if (!usuarios.length) {
        res.status(404).json({ mensaje: 'No se encontraron usuarios activos con ese rol.' });
        return;
      }

      const relaciones = usuarios.map((u) => ({
        documento_id,
        usuario_id: u.id,
        fecha_asignacion: new Date(),
      }));

      await RelDocumentoUsuario.bulkCreate(relaciones, { ignoreDuplicates: true });

      res.status(201).json({ mensaje: `✅ Documento asignado a ${usuarios.length} usuario(s) con rol.` });
    }

    else if (asignacion_tipo === 'usuarios') {
      if (!usuario_ids || !Array.isArray(usuario_ids) || usuario_ids.length === 0) {
        res.status(400).json({ mensaje: 'Debe especificar al menos un ID de usuario.' });
        return;
      }

      const relaciones = usuario_ids.map((id: number) => ({
        documento_id,
        usuario_id: id,
        fecha_asignacion: new Date(),
      }));

      await RelDocumentoUsuario.bulkCreate(relaciones, { ignoreDuplicates: true });

      res.status(201).json({ mensaje: '✅ Documento asignado a los usuarios seleccionados.' });
    }

    else {
      res.status(400).json({ mensaje: 'Tipo de asignación no válido.' });
    }

  } catch (error) {
    console.error('❌ Error al asignar documento:', error);
    res.status(500).json({ mensaje: '❌ Error al asignar documento', error });
  }
};

// ✅ Obtener documentos asignados por usuario (con datos del documento)
export const obtenerDocumentosPorUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { usuario_id } = req.params;

    const asignaciones = await RelDocumentoUsuario.findAll({
      where: { usuario_id },
      include: [
        {
          model: Documento,
          as: 'documento',
        },
      ],
    });

    // Transformar los datos para enviar solo lo necesario al frontend
    const documentos = asignaciones.map((asignacion) => {
      const doc = asignacion.documento?.toJSON?.() || asignacion.documento;

      return {
        ...doc,
        fecha_asignacion: asignacion.fecha_asignacion,
        recepcionado: asignacion.recepcionado,
        fecha_recepcion: asignacion.fecha_recepcion,
        activo: asignacion.activo,
      };
    });

    res.status(200).json(documentos);
  } catch (error) {
    console.error('❌ Error al obtener documentos por usuario:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener documentos', error });
  }
};


// ✅ Eliminar una asignación específica
export const eliminarAsignacionDocumentoUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const eliminado = await RelDocumentoUsuario.destroy({ where: { id } });

    if (eliminado) {
      res.status(200).json({ mensaje: '✅ Asignación eliminada correctamente.' });
    } else {
      res.status(404).json({ mensaje: 'Asignación no encontrada.' });
    }
  } catch (error) {
    console.error('❌ Error al eliminar asignación:', error);
    res.status(500).json({ mensaje: '❌ Error al eliminar asignación', error });
  }
};
