import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface MedidaCorrectivaAttributes {
  id: number;
  descripcion: string;
  fecha_cumplimiento: Date;
  estado: string;
  prioridad: string;
  evidencia_documento_id?: number;
  responsable_id: number;
  fecha_creacion?: Date;
}

interface MedidaCorrectivaCreationAttributes extends Optional<MedidaCorrectivaAttributes, 'id' | 'evidencia_documento_id' | 'fecha_creacion'> {}

export class MedidaCorrectivaModel extends Model<MedidaCorrectivaAttributes, MedidaCorrectivaCreationAttributes> implements MedidaCorrectivaAttributes {
  public id!: number;
  public descripcion!: string;
  public fecha_cumplimiento!: Date;
  public estado!: string;
  public prioridad!: string;
  public evidencia_documento_id?: number;
  public responsable_id!: number;
  public fecha_creacion!: Date;
}

export const MedidaCorrectiva = sequelize.define<MedidaCorrectivaModel>('medida_correctiva', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha_cumplimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prioridad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  evidencia_documento_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  responsable_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'medidas_correctivas',
  timestamps: false,
});
