import { Request, Response } from 'express';
import { Protocolo, Usuario, Empresa, Faena } from '../models';

// Tipo extendido solo para esta función
interface RequestConUsuario extends Request {
  usuario?: {
    id: number;
    nombre: string;
    correo: string;
    rol_id: number;
    faena_id: number;
  };
}

export const obtenerProtocolos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const protocolos = await Protocolo.findAll({
      where: { activo: true },
      include: [
        {
          model: Usuario,
          as: 'responsable',
          attributes: ['id', 'nombre', 'apellido']
        },
        {
          model: Empresa,
          as: 'empresa',
          attributes: ['id', 'nombre']
        },
        {
          model: Faena,
          as: 'faena',
          attributes: ['id', 'nombre']
        }
      ]
    });

    res.json(protocolos);
  } catch (error) {
    console.error('❌ Error al obtener protocolos:', error);
    res.status(500).json({ mensaje: 'Error al obtener protocolos', error });
  }
};

export const crearProtocolo = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoProtocolo = await Protocolo.create(req.body);
    res.status(201).json(nuevoProtocolo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear protocolo', error });
  }
};

export const actualizarProtocolo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const protocolo = await Protocolo.findByPk(id);
    if (!protocolo) {
      res.status(404).json({ mensaje: 'Protocolo no encontrado' });
      return;
    }

    await protocolo.update(req.body);
    res.json(protocolo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar protocolo', error });
  }
};

export const eliminarProtocolo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const protocolo = await Protocolo.findByPk(id);
    if (!protocolo) {
      res.status(404).json({ mensaje: 'Protocolo no encontrado' });
      return;
    }

    await protocolo.update({ activo: false });
    res.json({ mensaje: 'Protocolo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar protocolo', error });
  }
};

export const obtenerMisProtocolos = async (req: RequestConUsuario, res: Response): Promise<void> => {
  try {
    const usuarioId = req.usuario?.id;

    if (!usuarioId) {
      res.status(403).json({ mensaje: 'Usuario no autorizado' });
      return;
    }

    const protocolos = await Protocolo.findAll({
      where: {
        responsable_id: usuarioId,
        activo: true
      },
      include: [
        {
          model: Faena,
          as: 'faena',
          attributes: ['id', 'nombre']
        }
      ]
    });

    res.json(protocolos);
  } catch (error) {
    console.error('❌ Error al obtener protocolos del trabajador:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
