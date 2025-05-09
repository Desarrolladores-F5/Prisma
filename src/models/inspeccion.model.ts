import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface InspeccionAttributes {
  id: number;
  fecha: Date;
  faena_id: number;
  inspector_id: number;
  tipo: string;
  descripcion: string;
  observaciones?: string;
  conforme: boolean;
  fecha_creacion?: Date;
  activo: boolean;
}

interface InspeccionCreationAttributes extends Optional<InspeccionAttributes, 'id' | 'observaciones' | 'fecha_creacion'> {}

export class InspeccionModel extends Model<InspeccionAttributes, InspeccionCreationAttributes> implements InspeccionAttributes {
  public id!: number;
  public fecha!: Date;
  public faena_id!: number;
  public inspector_id!: number;
  public tipo!: string;
  public descripcion!: string;
  public observaciones?: string;
  public conforme!: boolean;
  public fecha_creacion!: Date;
  public activo!: boolean;
}

export const Inspeccion = sequelize.define<InspeccionModel>('inspeccion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  faena_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inspector_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  conforme: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
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
  tableName: 'inspecciones',
  timestamps: false,
});
