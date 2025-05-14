'use client';

import sequelize from '../config/database';

import { initRol, Rol } from './rol.model';
import { initUsuario, Usuario } from './usuario.model';
import { initReporte, Reporte } from './reporte.model';
import { initFaena, Faena } from './faena.model';
import { initAuditoria, Auditoria } from './auditoria.model';
import { initEmpresa, Empresa } from './empresa.model';
import { initProtocolo, Protocolo } from './protocolo.model';
import { Capacitacion } from './capacitacion.model';
import { Documento } from './documento.model';
import { EPP } from './epp.model';
import { Notificacion } from './notificacion.model';
import { MedidaCorrectiva } from './medida_correctiva.model';
import { Inspeccion } from './inspeccion.model';
import { FirmaDigital } from './firma_digital.model';
import { initArchivoAdjunto, ArchivoAdjunto } from './archivoAdjunto.model';

// ✅ Inicializar modelos base
initRol(sequelize);
initUsuario(sequelize);
initReporte(sequelize);
initFaena(sequelize);
initAuditoria(sequelize);
initEmpresa(sequelize);
initProtocolo(sequelize);
initArchivoAdjunto(sequelize);

// ✅ Relaciones entre modelos

Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });
Rol.hasMany(Usuario, { foreignKey: 'rol_id', as: 'usuarios' });

Usuario.belongsTo(Faena, { foreignKey: 'faena_id', as: 'faena' });
Faena.hasMany(Usuario, { foreignKey: 'faena_id', as: 'usuarios' });

Reporte.belongsTo(Faena, { foreignKey: 'faena_id', as: 'faena' });
Faena.hasMany(Reporte, { foreignKey: 'faena_id', as: 'reportes' });

Reporte.belongsTo(Auditoria, { foreignKey: 'auditoria_id', as: 'auditoria' });
Auditoria.hasMany(Reporte, { foreignKey: 'auditoria_id', as: 'reportes' });

Faena.belongsTo(Empresa, { foreignKey: 'empresa_id', as: 'empresa' });
Empresa.hasMany(Faena, { foreignKey: 'empresa_id', as: 'faenas' });

Faena.belongsTo(Usuario, { foreignKey: 'responsable_id', as: 'responsable' });
Usuario.hasMany(Faena, { foreignKey: 'responsable_id', as: 'faenas_responsables' });

Capacitacion.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Usuario.hasMany(Capacitacion, { foreignKey: 'usuario_id', as: 'capacitaciones' });

Capacitacion.belongsTo(Faena, { foreignKey: 'faena_id', as: 'faena' });
Faena.hasMany(Capacitacion, { foreignKey: 'faena_id', as: 'capacitaciones' });

Capacitacion.belongsTo(Documento, { foreignKey: 'documento_id', as: 'documento' });
Documento.hasMany(Capacitacion, { foreignKey: 'documento_id', as: 'capacitaciones' });

EPP.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
EPP.belongsTo(Faena, { foreignKey: 'faena_id', as: 'faena' });
EPP.belongsTo(Documento, { foreignKey: 'documento_id', as: 'documento' });

Notificacion.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Notificacion.belongsTo(Faena, { foreignKey: 'faena_id', as: 'faena' });

MedidaCorrectiva.belongsTo(Usuario, { foreignKey: 'responsable_id', as: 'responsable' });
Usuario.hasMany(MedidaCorrectiva, { foreignKey: 'responsable_id', as: 'medidas_correctivas' });

MedidaCorrectiva.belongsTo(Documento, { foreignKey: 'evidencia_documento_id', as: 'documento_evidencia' });
Documento.hasMany(MedidaCorrectiva, { foreignKey: 'evidencia_documento_id', as: 'medidas_correctivas' });

Inspeccion.belongsTo(Faena, { foreignKey: 'faena_id', as: 'faena' });
Faena.hasMany(Inspeccion, { foreignKey: 'faena_id', as: 'inspecciones' });

Inspeccion.belongsTo(Usuario, { foreignKey: 'inspector_id', as: 'inspector' });
Usuario.hasMany(Inspeccion, { foreignKey: 'inspector_id', as: 'inspecciones_realizadas' });

FirmaDigital.belongsTo(Usuario, { foreignKey: 'firmante_id', as: 'firmante' });
Usuario.hasMany(FirmaDigital, { foreignKey: 'firmante_id', as: 'firmas' });

Protocolo.belongsTo(Usuario, { foreignKey: 'responsable_id', as: 'responsable' });
Usuario.hasMany(Protocolo, { foreignKey: 'responsable_id', as: 'protocolos_responsables' });

Protocolo.belongsTo(Empresa, { foreignKey: 'empresa_id', as: 'empresa' });
Empresa.hasMany(Protocolo, { foreignKey: 'empresa_id', as: 'protocolos' });

Protocolo.belongsTo(Faena, { foreignKey: 'faena_id', as: 'faena' });
Faena.hasMany(Protocolo, { foreignKey: 'faena_id', as: 'protocolos' });


// ✅ Archivos Adjuntos
ArchivoAdjunto.belongsTo(Usuario, { foreignKey: 'subido_por_id', as: 'usuario' });
Usuario.hasMany(ArchivoAdjunto, { foreignKey: 'subido_por_id', as: 'archivos_subidos' });

// ✅ Exportación centralizada
export {
  sequelize,
  Rol,
  Usuario,
  Reporte,
  Faena,
  Auditoria,
  Empresa,
  Protocolo,
  Capacitacion,
  Documento,
  EPP,
  Notificacion,
  MedidaCorrectiva,
  Inspeccion,
  FirmaDigital,
  ArchivoAdjunto,
};
