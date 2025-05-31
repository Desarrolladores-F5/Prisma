// src/models/historial_cambio.model.ts
import { DataTypes, Sequelize, Model } from 'sequelize';

export class HistorialCambio extends Model {
  public id!: number;
  public entidad_tipo!: string;
  public entidad_id!: number;
  public usuario_id!: number;
  public accion!: string;
  public detalles!: object;
  public timestamp!: Date;
}

export const initHistorialCambio = (sequelize: Sequelize) => {
  HistorialCambio.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      entidad_tipo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      entidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accion: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      detalles: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'HistorialCambio',
      tableName: 'historial_cambios',
      timestamps: false,
    }
  );
};
