import { Request, Response } from 'express';
import { Protocolo, Usuario, Empresa, Faena } from '../models';

export const obtenerProtocolos = async (_req: Request, res: Response) => {
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

export const crearProtocolo = async (req: Request, res: Response) => {
  try {
    const nuevoProtocolo = await Protocolo.create(req.body);
    res.status(201).json(nuevoProtocolo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear protocolo', error });
  }
};

export const actualizarProtocolo = async (req: Request, res: Response) => {
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

export const eliminarProtocolo = async (req: Request, res: Response) => {
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
