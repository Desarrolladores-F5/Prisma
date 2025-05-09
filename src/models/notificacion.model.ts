import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface NotificacionAttributes {
  id: number;
  mensaje: string;
  tipo: string;
  usuario_id: number;
  origen?: string;
  faena_id?: number;
  fecha?: Date;
  leido: boolean;
  activo: boolean;
}

interface NotificacionCreationAttributes extends Optional<NotificacionAttributes, 'id' | 'origen' | 'faena_id' | 'fecha'> {}

export class NotificacionModel extends Model<NotificacionAttributes, NotificacionCreationAttributes> implements NotificacionAttributes {
  public id!: number;
  public mensaje!: string;
  public tipo!: string;
  public usuario_id!: number;
  public origen?: string;
  public faena_id?: number;
  public fecha!: Date;
  public leido!: boolean;
  public activo!: boolean;
}

export const Notificacion = sequelize.define<NotificacionModel>('notificacion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  origen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  faena_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  leido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'notificaciones',
  timestamps: false,
});
