import { Request, Response } from 'express';
import { Examen, Capacitacion } from '../models';

// ✅ Obtener todos los exámenes
export const obtenerExamenes = async (_req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener los exámenes', error });
  }
};

// ✅ Obtener examen por ID
export const obtenerExamenPorId = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener el examen', error });
  }
};

// ✅ Obtener examen por ID de capacitación
export const obtenerExamenPorCapacitacion = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al buscar examen por capacitación', error });
  }
};

// ✅ Crear nuevo examen
export const crearExamen = async (req: Request, res: Response) => {
  const { capacitacion_id, titulo, descripcion } = req.body;

  try {
    const nuevoExamen = await Examen.create({
      capacitacion_id,
      titulo,
      descripcion,
      activo: true, // campo obligatorio
    });

    res.status(201).json(nuevoExamen);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al crear el examen', error });
  }
};

// ✅ Actualizar examen existente
export const actualizarExamen = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar el examen', error });
  }
};

// ✅ Eliminar examen
export const eliminarExamen = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const examen = await Examen.findByPk(id);

    if (!examen) {
      res.status(404).json({ mensaje: '❌ Examen no encontrado' });
      return;
    }

    await examen.destroy();
    res.json({ mensaje: '✅ Examen eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar el examen', error });
  }
};
