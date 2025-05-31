import { Request, Response } from 'express';
import { Estadistica, Faena, Usuario } from '../models';
import PDFDocument from 'pdfkit';

// ✅ Obtener todas las estadísticas (ordenadas por fecha)
export const obtenerEstadisticas = async (_req: Request, res: Response) => {
  try {
    const estadisticas = await Estadistica.findAll({
      include: [
        { model: Faena, as: 'faena', attributes: ['nombre'] },
        { model: Usuario, as: 'usuario', attributes: ['nombre'] },
      ],
      order: [['fecha_generacion', 'ASC']],
    });
    res.json(estadisticas);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener estadísticas', error });
  }
};

// ✅ Obtener estadística por ID
export const obtenerEstadisticaPorId = async (req: Request, res: Response) => {
  try {
    const estadistica = await Estadistica.findByPk(req.params.id, {
      include: [
        { model: Faena, as: 'faena', attributes: ['nombre'] },
        { model: Usuario, as: 'usuario', attributes: ['nombre'] },
      ],
    });
    if (!estadistica) {
      res.status(404).json({ mensaje: '⚠️ Estadística no encontrada' });
      return;
    }
    res.json(estadistica);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener estadística', error });
  }
};

// ✅ Crear estadística con descripción automática
export const crearEstadistica = async (req: Request, res: Response) => {
  try {
    const fecha = new Date(req.body.fecha_generacion ?? new Date());

    const descripcion =
      req.body.descripcion?.trim() ||
      fecha.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

    const nueva = await Estadistica.create({
      ...req.body,
      descripcion,
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al crear estadística', error });
  }
};

// ✅ Actualizar estadística
export const actualizarEstadistica = async (req: Request, res: Response) => {
  try {
    const estadistica = await Estadistica.findByPk(req.params.id);
    if (!estadistica) {
      res.status(404).json({ mensaje: '⚠️ Estadística no encontrada' });
      return;
    }
    await estadistica.update(req.body);
    res.json(estadistica);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al actualizar estadística', error });
  }
};

// ✅ Eliminar estadística
export const eliminarEstadistica = async (req: Request, res: Response) => {
  try {
    const estadistica = await Estadistica.findByPk(req.params.id);
    if (!estadistica) {
      res.status(404).json({ mensaje: '⚠️ Estadística no encontrada' });
      return;
    }
    await estadistica.destroy();
    res.json({ mensaje: '✅ Estadística eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al eliminar estadística', error });
  }
};

// ✅ Exportar PDF
export const exportarEstadisticaPDF = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const estadistica = await Estadistica.findByPk(id, {
      include: [
        { model: Faena, as: 'faena', attributes: ['nombre'] },
        { model: Usuario, as: 'usuario', attributes: ['nombre'] },
      ],
    });

    if (!estadistica) {
      res.status(404).json({ mensaje: '⚠️ Estadística no encontrada' });
      return;
    }

    const estadisticaExtendida = estadistica as Estadistica & {
      faena?: { nombre: string };
      usuario?: { nombre: string };
    };

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=estadistica-${id}.pdf`);

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    // Título
    doc.fontSize(18).text('Certificado Estadístico de Seguridad Laboral', {
      align: 'center',
      underline: true,
    });

    doc.moveDown(2);
    doc.fontSize(12);

    const info: [string, string][] = [
      ['N° de Certificado', estadisticaExtendida.numero_certificado || '—'],
      ['Organismo Administrador', estadisticaExtendida.organismo_admin || '—'],
      ['Faena', estadisticaExtendida.faena?.nombre || '—'],
      ['Responsable', estadisticaExtendida.usuario?.nombre || '—'],
      [
        'Fecha de Generación',
        new Date(estadisticaExtendida.fecha_generacion!).toLocaleDateString('es-CL', {
          year: 'numeric',
          month: 'long',
        }),
      ],
      ['Descripción del periodo', estadisticaExtendida.descripcion || '—'],
    ];

    const datos = estadisticaExtendida.datos as any;

    const valores: [string, string | number][] = [
      ['N° de Accidentes', datos.accidentes],
      ['N° de Enfermedades Profesionales', datos.enfermedades],
      ['Días Perdidos por AT', datos.diasPerdidosAT],
      ['Días Perdidos por EP', datos.diasPerdidosEP],
      ['Promedio de Trabajadores', datos.trabajadores],
      ['N° de Accidentes Fatales', datos.accidentesFatales],
      ['N° de Pensionados', datos.pensionados],
      ['N° de Indemnizados', datos.indemnizados],
      ['Tasa de Siniestralidad', `${datos.tasaSiniestralidad}%`],
      ['Factor Invalidez y Muerte', datos.factorInvalidezMuerte],
      ['Tasa de Accidentabilidad', `${datos.tasaAccidentabilidad}%`],
      ['Tasa de Frecuencia', datos.tasaFrecuencia],
      ['Tasa de Gravedad', datos.tasaGravedad],
      ['Horas Hombre', datos.horasHombre],
      ['Cotización Riesgo Presunto', `${estadisticaExtendida.cotizacion_riesgo_presunto ?? 0}%`],
    ];

    const tabla = [...info, ...valores];

    const startX = 50;
    const startY = doc.y + 10;
    const col1Width = 250;
    const col2Width = 250;
    const rowHeight = 24;

    tabla.forEach(([label, value], i) => {
      const y = startY + i * rowHeight;

      doc.rect(startX, y, col1Width, rowHeight).stroke();
      doc.rect(startX + col1Width, y, col2Width, rowHeight).stroke();

      doc.font('Helvetica-Bold').fontSize(10).text(label, startX + 5, y + 7, {
        width: col1Width - 10,
        align: 'left',
      });

      doc.font('Helvetica').fontSize(10).text(String(value), startX + col1Width + 5, y + 7, {
        width: col2Width - 10,
        align: 'left',
      });
    });

    doc.end();
  } catch (error) {
    console.error('❌ Error al generar PDF:', error);
    res.status(500).json({ mensaje: '❌ Error al generar PDF', error });
  }
};
