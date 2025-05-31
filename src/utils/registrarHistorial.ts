// src/utils/registrarHistorial.ts
import { HistorialCambio } from '../models';

type AccionHistorial = 'creacion' | 'actualizacion' | 'eliminacion';

interface RegistroCambioParams {
  entidad_tipo: string;
  entidad_id: number;
  usuario_id: number;
  accion: AccionHistorial;
  detalles?: any;
}

export const registrarHistorial = async ({
  entidad_tipo,
  entidad_id,
  usuario_id,
  accion,
  detalles = {},
}: RegistroCambioParams): Promise<void> => {
  try {
    await HistorialCambio.create({
      entidad_tipo,
      entidad_id,
      usuario_id,
      accion,
      detalles,
      fecha: new Date(), // Si el modelo lo permite, se recomienda fijar la fecha aquí
    });
  } catch (error) {
    console.error('❌ Error al registrar historial:', error);
  }
};
