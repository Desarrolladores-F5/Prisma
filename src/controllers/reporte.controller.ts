import { Request, Response } from 'express';
import { Reporte, Faena, Usuario, Rol } from '../models'; // Auditoria removido
import jwt from 'jsonwebtoken';

// Crear reporte
export const crearReporte = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ mensaje: 'No autorizado. Token faltante.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_prisma') as any;
    const usuario_id = decoded.id;

    const nuevoReporte = await Reporte.create({
      ...req.body,        // el frontend ya no envía auditoria_id
      usuario_id,
      activo: true,
    });

    res.status(201).json({ mensaje: '✅ Reporte creado correctamente', id: nuevoReporte.id });
  } catch (error) {
    console.error('❌ Error al crear reporte:', error);
    res.status(500).json({ mensaje: '❌ Error al crear reporte', error });
  }
};

// Obtener todos los reportes con faena y usuario (con su rol)
export const obtenerReportes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reportes = await Reporte.findAll({
      where: { activo: true },
      include: [
        { model: Faena, as: 'faena' },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'apellido', 'correo'],
          include: [{ model: Rol, as: 'rol', attributes: ['nombre'] }],
        },
      ],
      order: [['fecha_creacion', 'DESC']],
    });

    res.status(200).json(reportes);
  } catch (error) {
    console.error('❌ Error al obtener reportes:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener reportes', error });
  }
};

// Actualizar reporte
export const actualizarReporte = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const reporte = await Reporte.findByPk(id);

    if (!reporte) {
      res.status(404).json({ mensaje: 'Reporte no encontrado' });
      return;
    }

    await reporte.update(req.body); // auditoria_id no llegará desde el frontend
    res.json({ mensaje: '✅ Reporte actualizado correctamente', id: reporte.id });
  } catch (error) {
    console.error('❌ Error al actualizar reporte:', error);
    res.status(500).json({ mensaje: '❌ Error al actualizar reporte', error });
  }
};

// Eliminar reporte (borrado lógico)
export const eliminarReporte = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const reporte = await Reporte.findByPk(id);

    if (!reporte) {
      res.status(404).json({ mensaje: 'Reporte no encontrado' });
      return;
    }

    await reporte.update({ activo: false });
    res.json({ mensaje: '✅ Reporte eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar reporte:', error);
    res.status(500).json({ mensaje: '❌ Error al eliminar reporte', error });
  }
};

// Obtener reportes del usuario autenticado (trabajador)
export const obtenerReportesDelUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ mensaje: 'Token no proporcionado' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_prisma') as any;
    const usuario_id = decoded.id;

    const reportes = await Reporte.findAll({
      where: { usuario_id, activo: true },
      include: [
        { model: Faena, as: 'faena', attributes: ['nombre'] },
        // Auditoría removida
      ],
      order: [['fecha_creacion', 'DESC']],
    });

    res.status(200).json(reportes);
  } catch (error) {
    console.error('❌ Error al obtener mis reportes:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener mis reportes', error });
  }
};
