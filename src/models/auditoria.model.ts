// src/models/auditoria.model.ts
import { DataTypes, Sequelize, Model, ModelStatic } from 'sequelize';
import { Faena } from './faena.model';
import { Usuario } from './usuario.model';

let Auditoria: ModelStatic<Model>;

export function initAuditoria(sequelize: Sequelize) {
  Auditoria = sequelize.define('auditoria', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    faena_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    auditor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(100),
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    observaciones: {
      type: DataTypes.TEXT,
    },
    conforme: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'auditorias',
    timestamps: false,
  });

  // ✅ Asociaciones para incluir datos relacionados
  Auditoria.belongsTo(Faena, { as: 'faena', foreignKey: 'faena_id' });
  Auditoria.belongsTo(Usuario, { as: 'auditor', foreignKey: 'auditor_id' });

  return Auditoria;
}

export { Auditoria };
