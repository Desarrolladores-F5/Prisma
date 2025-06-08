import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface RespuestaExamenAttributes {
  id: number;
  usuario_id: number;
  examen_id: number;
  pregunta_id: number;
  respuesta_entregada: number;
  correcta: boolean;
  fecha_respuesta?: Date;
}

export interface RespuestaExamenCreationAttributes
  extends Optional<RespuestaExamenAttributes, 'id' | 'fecha_respuesta'> {}

export class RespuestaExamen extends Model<
  RespuestaExamenAttributes,
  RespuestaExamenCreationAttributes
> implements RespuestaExamenAttributes {
  public id!: number;
  public usuario_id!: number;
  public examen_id!: number;
  public pregunta_id!: number;
  public respuesta_entregada!: number;
  public correcta!: boolean;
  public fecha_respuesta!: Date;
}

export function initRespuestaExamen(sequelize: Sequelize): void {
  RespuestaExamen.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      examen_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pregunta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      respuesta_entregada: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      correcta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fecha_respuesta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'RespuestaExamen',
      tableName: 'respuestas_examen',
      timestamps: false,
    }
  );
}
