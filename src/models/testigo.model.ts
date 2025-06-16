import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface TestigoAttributes {
  id: number;
  nombre: string;
  apellido: string;
  rut: string;
  correo?: string;
  telefono?: string;
  empresa_id?: number;
  reporte_id: number;
  declaracion?: string;
  fecha_creacion?: Date;
  activo: boolean;
}

export interface TestigoCreationAttributes extends Optional<TestigoAttributes, 'id' | 'correo' | 'telefono' | 'empresa_id' | 'declaracion' | 'fecha_creacion' | 'activo'> {}

export class Testigo extends Model<TestigoAttributes, TestigoCreationAttributes> implements TestigoAttributes {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public rut!: string;
  public correo?: string;
  public telefono?: string;
  public empresa_id?: number;
  public reporte_id!: number;
  public declaracion?: string;
  public fecha_creacion!: Date;
  public activo!: boolean;
}

export function initTestigo(sequelize: Sequelize): void {
  Testigo.init(
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
      apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      rut: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reporte_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      declaracion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Testigo',
      tableName: 'testigos',
      timestamps: false,
    }
  );
}
