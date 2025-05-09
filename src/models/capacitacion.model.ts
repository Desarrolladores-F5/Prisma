import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Usuario } from './usuario.model';
import { Faena } from './faena.model';
import { Documento } from './documento.model';

export interface CapacitacionAttributes {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  usuario_id: number;
  faena_id: number;
  asistencia: any; // JSONB
  documento_id?: number;
  activo: boolean;
  fecha_creacion?: Date;
}

interface CapacitacionCreationAttributes extends Optional<CapacitacionAttributes, 'id' | 'documento_id' | 'fecha_creacion'> {}

export class CapacitacionModel extends Model<CapacitacionAttributes, CapacitacionCreationAttributes>
  implements CapacitacionAttributes {
  public id!: number;
  public titulo!: string;
  public descripcion!: string;
  public fecha!: Date;
  public usuario_id!: number;
  public faena_id!: number;
  public asistencia!: any;
  public documento_id?: number;
  public activo!: boolean;
  public readonly fecha_creacion!: Date;

  public static associate(models: any) {
    Capacitacion.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    Capacitacion.belongsTo(models.Faena, { foreignKey: 'faena_id', as: 'faena' });
    Capacitacion.belongsTo(models.Documento, { foreignKey: 'documento_id', as: 'documento' });
  }
}

export const Capacitacion = sequelize.define<CapacitacionModel>('capacitacion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  faena_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  asistencia: {
    type: DataTypes.JSON,
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
  tableName: 'capacitaciones',
  timestamps: false,
});
