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

export interface InspeccionCreationAttributes
  extends Optional<InspeccionAttributes, 'id' | 'observaciones' | 'fecha_creacion' | 'inspector_id'> {} // ✅ Marcar como opcional

export class InspeccionModel
  extends Model<InspeccionAttributes, InspeccionCreationAttributes>
  implements InspeccionAttributes
{
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
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  faena_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'faenas',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  inspector_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // ✅ Corregido aquí
    references: {
      model: 'usuarios',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  tipo: {
    type: DataTypes.STRING(100),
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
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'inspecciones',
  timestamps: false,
});
