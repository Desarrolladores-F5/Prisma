import { Request, Response } from 'express';
import { Auditoria, Faena, Usuario, Rol } from '../models';

// ✅ Obtener todas las auditorías con faena y auditor (con rol)
export const obtenerAuditorias = async (_req: Request, res: Response) => {
  try {
    const auditorias = await Auditoria.findAll({
      include: [
        {
          model: Faena,
          as: 'faena',
          attributes: ['id', 'nombre']
        },
        {
          model: Usuario,
          as: 'auditor',
          attributes: ['id', 'nombre', 'apellido'],
          include: [
            {
              model: Rol,
              as: 'rol',
              attributes: ['nombre']
            }
          ]
        }
      ]
    });

    res.json(auditorias);
  } catch (error) {
    console.error('❌ Error al obtener auditorías:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener auditorías', error });
  }
};

// ✅ Crear nueva auditoría
export const crearAuditoria = async (req: Request, res: Response) => {
  try {
    const nueva = await Auditoria.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    console.error('❌ Error al crear auditoría:', error);
    res.status(400).json({ mensaje: '❌ Error al crear auditoría', error });
  }
};

// ✅ Actualizar auditoría existente
export const actualizarAuditoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [actualizada] = await Auditoria.update(req.body, { where: { id } });

    if (actualizada) {
      const auditoria = await Auditoria.findByPk(id, {
        include: [
          {
            model: Faena,
            as: 'faena',
            attributes: ['id', 'nombre']
          },
          {
            model: Usuario,
            as: 'auditor',
            attributes: ['id', 'nombre', 'apellido'],
            include: [
              {
                model: Rol,
                as: 'rol',
                attributes: ['nombre']
              }
            ]
          }
        ]
      });

      res.json(auditoria);
    } else {
      res.status(404).json({ mensaje: 'Auditoría no encontrada' });
    }
  } catch (error) {
    console.error('❌ Error al actualizar auditoría:', error);
    res.status(400).json({ mensaje: '❌ Error al actualizar auditoría', error });
  }
};

// ✅ Eliminar auditoría
export const eliminarAuditoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eliminada = await Auditoria.destroy({ where: { id } });

    if (eliminada) {
      res.json({ mensaje: '✅ Auditoría eliminada correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Auditoría no encontrada' });
    }
  } catch (error) {
    console.error('❌ Error al eliminar auditoría:', error);
    res.status(500).json({ mensaje: '❌ Error al eliminar auditoría', error });
  }
};
