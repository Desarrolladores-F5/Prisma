// src/models/faena.model.ts
import { DataTypes, Sequelize, Model, ModelStatic } from 'sequelize';

let Faena: ModelStatic<Model>;

export function initFaena(sequelize: Sequelize) {
  Faena = sequelize.define('faena', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    empresa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    responsable_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(50),
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
    },
    fecha_termino: {
      type: DataTypes.DATEONLY,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'faenas',
    timestamps: false,
  });

  return Faena;
}

export { Faena };
