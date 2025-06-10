import { Request, Response } from 'express';
import { Examen, Capacitacion } from '../models';

// ✅ Obtener todos los exámenes
export const obtenerExamenes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const examenes = await Examen.findAll({
      include: [
        {
          model: Capacitacion,
          as: 'capacitacion',
          attributes: ['id', 'titulo'],
        },
      ],
      order: [['id', 'ASC']],
    });
    res.json(examenes);
  } catch (error: any) {
    res.status(500).json({ mensaje: '❌ Error al obtener los exámenes', error: error.message });
  }
};

// ✅ Obtener examen por ID
export const obtenerExamenPorId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const examen = await Examen.findByPk(id, {
      include: [{ model: Capacitacion, as: 'capacitacion' }],
    });

    if (!examen) {
      res.status(404).json({ mensaje: '❌ Examen no encontrado' });
      return;
    }

    res.json(examen);
  } catch (error: any) {
    res.status(500).json({ mensaje: '❌ Error al obtener el examen', error: error.message });
  }
};

// ✅ Obtener examen por ID de capacitación
export const obtenerExamenPorCapacitacion = async (req: Request, res: Response): Promise<void> => {
  const { capacitacion_id } = req.params;

  try {
    const examen = await Examen.findOne({
      where: { capacitacion_id },
      include: [{ model: Capacitacion, as: 'capacitacion' }],
    });

    if (!examen) {
      res.status(404).json({ mensaje: '❌ No se encontró examen para esta capacitación' });
      return;
    }

    res.json(examen);
  } catch (error: any) {
    res.status(500).json({ mensaje: '❌ Error al buscar examen por capacitación', error: error.message });
  }
};

// ✅ Crear nuevo examen
export const crearExamen = async (req: Request, res: Response): Promise<void> => {
  const { capacitacion_id, titulo, descripcion } = req.body;

  try {
    const nuevoExamen = await Examen.create({
      capacitacion_id,
      titulo,
      descripcion,
      activo: true,
    });

    res.status(201).json(nuevoExamen);
  } catch (error: any) {
    res.status(500).json({ mensaje: '❌ Error al crear el examen', error: error.message });
  }
};

// ✅ Actualizar examen existente
export const actualizarExamen = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;

  try {
    const examen = await Examen.findByPk(id);

    if (!examen) {
      res.status(404).json({ mensaje: '❌ Examen no encontrado' });
      return;
    }

    await examen.update({ titulo, descripcion });
    res.json(examen);
  } catch (error: any) {
    res.status(500).json({ mensaje: '❌ Error al actualizar el examen', error: error.message });
  }
};

// ✅ Eliminar examen
export const eliminarExamen = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const examen = await Examen.findByPk(id);

    if (!examen) {
      res.status(404).json({ mensaje: '❌ Examen no encontrado' });
      return;
    }

    await examen.destroy();
    res.json({ mensaje: '✅ Examen eliminado correctamente' });
  } catch (error: any) {
    console.error('❌ Error en backend al eliminar examen:', error.message);
    res.status(500).json({ mensaje: '❌ Error al eliminar el examen', error: error.message });
  }
};
