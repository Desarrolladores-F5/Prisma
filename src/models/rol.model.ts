import { DataTypes, Model, Sequelize } from 'sequelize';

export class Rol extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion?: string;
  public activo!: boolean;
  public fecha_creacion!: Date;
}

export function initRol(sequelize: Sequelize) {
  Rol.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'roles',
      timestamps: false,
    }
  );
}
