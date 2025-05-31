import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface RespuestaFormularioAttributes {
  id: number;
  formulario_id: number;
  usuario_id?: number;
  respuestas_json: object;
  fecha_respuesta?: Date;
  activo: boolean;
}

export interface RespuestaFormularioCreationAttributes
  extends Optional<RespuestaFormularioAttributes, 'id' | 'usuario_id' | 'fecha_respuesta' | 'activo'> {}

export class RespuestaFormulario extends Model<
  RespuestaFormularioAttributes,
  RespuestaFormularioCreationAttributes
> implements RespuestaFormularioAttributes {
  public id!: number;
  public formulario_id!: number;
  public usuario_id?: number;
  public respuestas_json!: object;
  public fecha_respuesta!: Date;
  public activo!: boolean;
}

export function initRespuestaFormulario(sequelize: Sequelize): void {
  RespuestaFormulario.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      formulario_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      respuestas_json: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      fecha_respuesta: {
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
      modelName: 'RespuestaFormulario',
      tableName: 'respuestas_formulario',
      timestamps: false,
    }
  );
}
