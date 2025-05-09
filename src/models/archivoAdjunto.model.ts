// src/models/archivoAdjunto.model.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

export class ArchivoAdjunto extends Model {}

export function initArchivoAdjunto(sequelize: Sequelize) {
  ArchivoAdjunto.init(
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
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      nombre_archivo: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      tipo_archivo: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      tamaño_archivo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      subido_por_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'usuarios', // nombre de la tabla de usuarios
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      fecha_subida: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'ArchivoAdjunto',
      tableName: 'archivos_adjuntos',
      timestamps: false,
    }
  );
}
