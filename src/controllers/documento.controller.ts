// src/controllers/documento.controller.ts
import { Request, Response } from 'express';
import { Documento, RelDocumentoUsuario, Usuario } from '../models';
import fs from 'fs';
import path from 'path';
import { generarPDFConfirmacion } from '../utils/pdf'; // ✅ Utilidad importada

export const obtenerDocumentos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const documentos = await Documento.findAll({ where: { activo: true } });
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener documentos', error });
  }
};

export const crearDocumento = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      nombre, tipo, url, version, activo = true,
      asignacion_tipo, usuario_ids = [], rol_id,
    } = req.body;

    const creador_id = (req as any).usuario?.id;

    if (!creador_id) {
      res.status(401).json({ mensaje: '❌ Usuario no autenticado' });
      return;
    }
    if (!nombre || !tipo || !url || !version || !asignacion_tipo) {
      res.status(400).json({ mensaje: '❌ Faltan campos requeridos' });
      return;
    }
    if (!url.startsWith('/uploads/')) {
      res.status(400).json({ mensaje: '❌ La URL debe comenzar con /uploads/' });
      return;
    }

    const nuevoDocumento = await Documento.create({ nombre, tipo, url, version, activo });

    let usuariosAsignados: number[] = [];
    switch (asignacion_tipo) {
      case 'todos':
        usuariosAsignados = (await Usuario.findAll({ where: { activo: true } })).map(u => u.id);
        break;
      case 'rol':
        if (!rol_id) {
          res.status(400).json({ mensaje: '❌ Falta rol_id' });
          return;
        }
        usuariosAsignados = (await Usuario.findAll({ where: { rol_id, activo: true } })).map(u => u.id);
        break;
      case 'usuarios':
        if (!Array.isArray(usuario_ids)) {
          res.status(400).json({ mensaje: '❌ usuario_ids debe ser un arreglo' });
          return;
        }
        usuariosAsignados = usuario_ids;
        break;
      default:
        res.status(400).json({ mensaje: '❌ Tipo de asignación inválido' });
        return;
    }

    await RelDocumentoUsuario.bulkCreate(
      usuariosAsignados.map(usuario_id => ({
        documento_id: nuevoDocumento.id,
        usuario_id,
        fecha_asignacion: new Date(),
      }))
    );

    res.status(201).json({
      mensaje: '✅ Documento creado y asignado correctamente',
      documento: nuevoDocumento,
    });
  } catch (error) {
    console.error('❌ Error al crear documento:', error);
    res.status(500).json({ mensaje: '❌ Error al crear documento', error });
  }
};

export const actualizarDocumento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, tipo, url, version, activo } = req.body;

    if (!nombre || !tipo || !url || !version) {
      res.status(400).json({ mensaje: '❌ Faltan campos requeridos' });
      return;
    }
    if (!url.startsWith('/uploads/')) {
      res.status(400).json({ mensaje: '❌ La URL debe comenzar con /uploads/' });
      return;
    }

    const [actualizado] = await Documento.update({ nombre, tipo, url, version, activo }, { where: { id } });

    if (actualizado) {
      const documento = await Documento.findByPk(id);
      res.json(documento);
    } else {
      res.status(404).json({ mensaje: '❌ Documento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar documento', error });
  }
};

export const eliminarDocumento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [resultado] = await Documento.update({ activo: false }, { where: { id } });

    if (resultado) {
      res.json({ mensaje: '✅ Documento eliminado (soft delete)' });
    } else {
      res.status(404).json({ mensaje: '❌ Documento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar documento', error });
  }
};

export const obtenerMisDocumentos = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = (req as any).usuario;
    if (!usuario?.id) {
      res.status(401).json({ mensaje: '❌ Usuario no autenticado' });
      return;
    }

    const documentos = await Documento.findAll({
      include: [
        {
          association: 'asignaciones',
          where: { usuario_id: usuario.id, activo: true },
          required: true,
          attributes: ['fecha_asignacion', 'recepcionado', 'fecha_recepcion', 'ruta_constancia_pdf'],
        },
      ],
      where: { activo: true },
    });

    res.json(documentos.map((doc: any) => {
      const a = doc.asignaciones[0];
      return {
        id: doc.id,
        nombre: doc.nombre,
        tipo: doc.tipo,
        url: doc.url,
        version: doc.version,
        fecha_creacion: doc.fecha_creacion,
        activo: doc.activo,
        recepcionado: a?.recepcionado ?? false,
        fecha_recepcion: a?.fecha_recepcion ?? null,
        fecha_asignacion: a?.fecha_asignacion ?? null,
        ruta_constancia_pdf: a?.ruta_constancia_pdf ?? null,
      };
    }));
  } catch (error) {
    console.error('❌ Error al obtener documentos:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener documentos del usuario', error });
  }
};

export const obtenerDocumentoPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const documento = await Documento.findByPk(req.params.id);
    if (documento) {
      res.json(documento);
    } else {
      res.status(404).json({ mensaje: '❌ Documento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener documento por ID', error });
  }
};

export const confirmarRecepcionDocumento = async (req: Request, res: Response): Promise<void> => {
  const usuario = (req as any).usuario;
  const documentoId = Number(req.params.documentoId);

  if (!usuario?.id || !documentoId) {
    res.status(400).json({ mensaje: '❌ Datos inválidos' });
    return;
  }

  try {
    const relacion = await RelDocumentoUsuario.findOne({
      where: { usuario_id: usuario.id, documento_id: documentoId },
      include: [
        { model: Usuario, as: 'usuario' },
        { model: Documento, as: 'documento' },
      ],
    });

    if (!relacion) {
      res.status(404).json({ mensaje: '❌ Asignación no encontrada' });
      return;
    }

    if (relacion.recepcionado) {
      res.status(409).json({ mensaje: '⚠️ Documento ya confirmado' });
      return;
    }

    if (!relacion.usuario || !relacion.documento) {
      res.status(500).json({ mensaje: '❌ Datos incompletos para generar constancia' });
      return;
    }

    // Actualizar estado de recepción
    relacion.recepcionado = true;
    relacion.fecha_recepcion = new Date();

    // ✅ Generar PDF con utilidad externa
    const rutaRelativa = await generarPDFConfirmacion({
      documento: relacion.documento,
      usuario: relacion.usuario,
      fecha: relacion.fecha_recepcion,
      documentoId,
      usuarioId: usuario.id,
    });

    relacion.ruta_constancia_pdf = rutaRelativa;
    await relacion.save();

    res.status(200).json({
      mensaje: '✅ Documento recepcionado y constancia generada',
      constancia_url: rutaRelativa,
    });
  } catch (error) {
    console.error('❌ Error al confirmar recepción:', error);
    res.status(500).json({ mensaje: '❌ Error al confirmar recepción del documento', error });
  }
};

export const obtenerConfirmacionesDocumento = async (req: Request, res: Response): Promise<void> => {
  try {
    const confirmaciones = await RelDocumentoUsuario.findAll({
      where: { documento_id: req.params.id, recepcionado: true },
      include: [
        { model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'apellido', 'correo'] },
        { model: Documento, as: 'documento', attributes: ['id', 'nombre', 'tipo'] },
      ],
    });

    const datos = confirmaciones.map((relacion) => {
      if (!relacion.usuario || !relacion.documento) return null;
      return {
        id: relacion.id,
        usuario_id: relacion.usuario.id,
        nombre_usuario: `${relacion.usuario.nombre} ${relacion.usuario.apellido}`,
        correo_usuario: relacion.usuario.correo,
        documento_id: relacion.documento.id,
        nombre_documento: relacion.documento.nombre,
        tipo_documento: relacion.documento.tipo,
        fecha_recepcion: relacion.fecha_recepcion,
        constancia_pdf: relacion.ruta_constancia_pdf ?? null,
      };
    }).filter((r): r is NonNullable<typeof r> => r !== null);

    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener confirmaciones', error });
  }
};
