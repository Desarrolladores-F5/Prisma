// src/models/historial_cambio.model.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface HistorialCambioAttributes {
  id: number;
  entidad_tipo: string;
  entidad_id: number;
  usuario_id?: number | null;
  accion: string;
  detalles: object;
  timestamp?: Date;
}

export interface HistorialCambioCreationAttributes
  extends Optional<HistorialCambioAttributes, 'id' | 'usuario_id' | 'timestamp'> {}

export class HistorialCambio extends Model<HistorialCambioAttributes, HistorialCambioCreationAttributes>
  implements HistorialCambioAttributes {
  public id!: number;
  public entidad_tipo!: string;
  public entidad_id!: number;
  public usuario_id!: number | null;
  public accion!: string;
  public detalles!: object;
  public timestamp!: Date;
}

export function initHistorialCambio(sequelize: Sequelize): void {
  HistorialCambio.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      entidad_tipo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      entidad_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      accion: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      detalles: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'historial_cambios',
      timestamps: false,
    }
  );
}
