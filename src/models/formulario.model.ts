import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

export interface FormularioAttributes {
  id: number;
  nombre: string;
  tipo: string;
  estructura_json: object;
  creador_id: number;
  fecha_creacion?: Date;
  activo: boolean;
}

export interface FormularioCreationAttributes extends Optional<FormularioAttributes, 'id' | 'fecha_creacion'> {}

export class Formulario extends Model<FormularioAttributes, FormularioCreationAttributes> implements FormularioAttributes {
  public id!: number;
  public nombre!: string;
  public tipo!: string;
  public estructura_json!: object;
  public creador_id!: number;
  public fecha_creacion!: Date;
  public activo!: boolean;
}

export function initFormulario(sequelize: Sequelize): void {
  Formulario.init(
    {
      id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      estructura_json: {
        type: DataTypes.JSON, 
        allowNull: false,
      },
      creador_id: {
        type: DataTypes.INTEGER, 
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
    },
    {
      sequelize,
      modelName: 'Formulario',
      tableName: 'formularios',
      timestamps: false,
    }
  );
}
