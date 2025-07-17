// src/controllers/documento.controller.ts
import { Request, Response } from 'express';
import { Documento, RelDocumentoUsuario, Usuario } from '../models';

// Obtener todos los documentos activos (solo para administrador)
export const obtenerDocumentos = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const documentos = await Documento.findAll({ where: { activo: true } });
    return res.json(documentos);
  } catch (error) {
    return res.status(500).json({ mensaje: '❌ Error al obtener documentos', error });
  }
};

// Crear un nuevo documento y asignarlo
export const crearDocumento = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      nombre,
      tipo,
      url,
      version,
      activo = true,
      asignacion_tipo, // 'todos' | 'rol' | 'usuarios'
      usuario_ids = [],
      rol_id,
    } = req.body;

    const creador_id = (req as any).usuario?.id;

    if (!creador_id) {
      return res.status(401).json({ mensaje: '❌ Usuario no autenticado' });
    }

    if (!nombre || !tipo || !url || !version || !asignacion_tipo) {
      return res.status(400).json({ mensaje: '❌ Faltan campos requeridos' });
    }

    if (!url.startsWith('/uploads/')) {
      return res.status(400).json({ mensaje: '❌ La URL del archivo debe comenzar con /uploads/' });
    }

    const nuevoDocumento = await Documento.create({ nombre, tipo, url, version, activo });

    let usuariosAsignados: number[] = [];

    switch (asignacion_tipo) {
      case 'todos':
        const todos = await Usuario.findAll({ where: { activo: true } });
        usuariosAsignados = todos.map(u => u.id);
        break;
      case 'rol':
        if (!rol_id) {
          return res.status(400).json({ mensaje: '❌ Falta rol_id para la asignación por rol' });
        }
        const porRol = await Usuario.findAll({ where: { rol_id, activo: true } });
        usuariosAsignados = porRol.map(u => u.id);
        break;
      case 'usuarios':
        if (!Array.isArray(usuario_ids)) {
          return res.status(400).json({ mensaje: '❌ usuario_ids debe ser un arreglo' });
        }
        usuariosAsignados = usuario_ids;
        break;
      default:
        return res.status(400).json({ mensaje: '❌ Tipo de asignación inválido' });
    }

    const relaciones = usuariosAsignados.map((usuario_id) => ({
      documento_id: nuevoDocumento.id,
      usuario_id,
      fecha_asignacion: new Date(),
    }));

    await RelDocumentoUsuario.bulkCreate(relaciones);

    return res.status(201).json({
      mensaje: '✅ Documento creado y asignado correctamente',
      documento: nuevoDocumento,
    });
  } catch (error) {
    console.error('❌ Error al crear documento:', error);
    return res.status(500).json({ mensaje: '❌ Error al crear documento', error });
  }
};

// Actualizar documento
export const actualizarDocumento = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { nombre, tipo, url, version, activo } = req.body;

    if (!nombre || !tipo || !url || !version) {
      return res.status(400).json({ mensaje: '❌ Faltan campos requeridos' });
    }

    if (!url.startsWith('/uploads/')) {
      return res.status(400).json({ mensaje: '❌ La URL del archivo debe comenzar con /uploads/' });
    }

    const [actualizado] = await Documento.update(
      { nombre, tipo, url, version, activo },
      { where: { id } }
    );

    if (actualizado) {
      const documento = await Documento.findByPk(id);
      return res.json(documento);
    } else {
      return res.status(404).json({ mensaje: '❌ Documento no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: '❌ Error al actualizar documento', error });
  }
};

// Eliminar documento (soft delete)
export const eliminarDocumento = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const [resultado] = await Documento.update({ activo: false }, { where: { id } });

    if (resultado) {
      return res.json({ mensaje: '✅ Documento eliminado correctamente (soft delete)' });
    } else {
      return res.status(404).json({ mensaje: '❌ Documento no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: '❌ Error al eliminar documento', error });
  }
};

// Obtener documentos asignados al usuario autenticado
export const obtenerMisDocumentos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const usuario = (req as any).usuario;

    if (!usuario?.id) {
      return res.status(401).json({ mensaje: '❌ Usuario no autenticado' });
    }

    const documentos = await Documento.findAll({
      include: [
        {
          association: 'asignaciones', // relación Documento.hasMany(RelDocumentoUsuario, as: 'asignaciones')
          where: {
            usuario_id: usuario.id,
            activo: true, // solo asignaciones activas
          },
          required: true,
          attributes: ['fecha_asignacion', 'recepcionado', 'fecha_recepcion'],
        },
      ],
      where: { activo: true },
    });

    const adaptados = documentos.map((doc: any) => {
      const asignacion = doc.asignaciones?.[0];

      return {
        id: doc.id,
        nombre: doc.nombre,
        tipo: doc.tipo,
        url: doc.url,
        version: doc.version,
        fecha_creacion: doc.fecha_creacion,
        activo: doc.activo,
        recepcionado: asignacion?.recepcionado ?? false,
        fecha_recepcion: asignacion?.fecha_recepcion ?? null,
        fecha_asignacion: asignacion?.fecha_asignacion ?? null,
      };
    });

    return res.json(adaptados);
  } catch (error) {
    console.error('❌ Error al obtener mis documentos:', error);
    return res.status(500).json({ mensaje: '❌ Error al obtener documentos del usuario', error });
  }
};

// Obtener documento por ID
export const obtenerDocumentoPorId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const documento = await Documento.findByPk(id);

    if (!documento) {
      return res.status(404).json({ mensaje: '❌ Documento no encontrado' });
    }

    return res.json(documento);
  } catch (error) {
    console.error('❌ Error al obtener documento por ID:', error);
    return res.status(500).json({ mensaje: '❌ Error al obtener documento por ID', error });
  }
};

// Confirmar recepción de documento por parte del usuario autenticado
export const confirmarRecepcionDocumento = async (req: Request, res: Response): Promise<Response> => {
  const usuario = (req as any).usuario;
  const documentoId = Number(req.params.documentoId);

  if (!usuario?.id || !documentoId) {
    return res.status(400).json({ mensaje: '❌ Datos inválidos o faltantes' });
  }

  try {
    const relacion = await RelDocumentoUsuario.findOne({
      where: {
        usuario_id: usuario.id,
        documento_id: documentoId,
      },
    });

    if (!relacion) {
      return res.status(404).json({ mensaje: '❌ No se encontró la asignación del documento' });
    }

    if (relacion.recepcionado) {
      return res.status(409).json({ mensaje: '⚠️ El documento ya fue recepcionado previamente' });
    }

    relacion.recepcionado = true;
    relacion.fecha_recepcion = new Date();
    await relacion.save();

    return res.status(200).json({ mensaje: '✅ Documento recepcionado correctamente' });
  } catch (error) {
    console.error('❌ Error al confirmar recepción:', error);
    return res.status(500).json({ mensaje: '❌ Error al confirmar recepción del documento', error });
  }
};

// Obtener confirmaciones por documento (para administrador)
export const obtenerConfirmacionesDocumento = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const confirmaciones = await RelDocumentoUsuario.findAll({
      where: {
        documento_id: id,
        recepcionado: true,
      },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'apellido', 'correo'],
        },
        {
          model: Documento,
          as: 'documento',
          attributes: ['id', 'nombre', 'tipo'],
        },
      ],
    });

    return res.status(200).json(confirmaciones);
  } catch (error) {
    console.error('❌ Error al obtener confirmaciones del documento:', error);
    return res.status(500).json({ mensaje: '❌ Error al obtener confirmaciones del documento', error });
  }
};
