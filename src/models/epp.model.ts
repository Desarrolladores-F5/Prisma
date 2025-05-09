import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface EPPAttributes {
  id: number;
  usuario_id: number;
  tipo: string;
  descripcion?: string;
  faena_id?: number;
  fecha_entrega: Date;
  fecha_vencimiento: Date;
  estado: string;
  documento_id?: number;
  activo: boolean;
  fecha_creacion?: Date;
}

interface EPPCreationAttributes extends Optional<EPPAttributes, 'id' | 'descripcion' | 'faena_id' | 'documento_id' | 'fecha_creacion'> {}

export class EPPModel extends Model<EPPAttributes, EPPCreationAttributes> implements EPPAttributes {
  public id!: number;
  public usuario_id!: number;
  public tipo!: string;
  public descripcion?: string;
  public faena_id?: number;
  public fecha_entrega!: Date;
  public fecha_vencimiento!: Date;
  public estado!: string;
  public documento_id?: number;
  public activo!: boolean;
  public readonly fecha_creacion!: Date;
}

export const EPP = sequelize.define<EPPModel>('epp', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  faena_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha_entrega: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documento_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  tableName: 'epp',
  timestamps: false,
});
