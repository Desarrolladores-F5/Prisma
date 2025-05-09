// src/models/empresa.model.ts
import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

let Empresa: ModelStatic<Model>;

export function initEmpresa(sequelize: Sequelize) {
  Empresa = sequelize.define('empresa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rut: DataTypes.STRING(20),
    razon_social: DataTypes.STRING,
    direccion: DataTypes.TEXT,
    telefono: DataTypes.STRING(20),
    correo: DataTypes.STRING,
    representante_legal: DataTypes.STRING,
    rubro: DataTypes.STRING,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'empresas',
    timestamps: false,
  });

  return Empresa;
}

export { Empresa };
