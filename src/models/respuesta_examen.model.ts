import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface RespuestaExamenAttributes {
  id: number;
  usuario_id: number;
  examen_id: number;
  pregunta_id: number;
  respuesta_entregada: string;
  correcta: boolean;
  fecha_respuesta?: Date;
  porcentaje_aprobacion?: number;
  aprobado?: boolean;
}

export interface RespuestaExamenCreationAttributes
  extends Optional<RespuestaExamenAttributes, 'id' | 'fecha_respuesta' | 'porcentaje_aprobacion' | 'aprobado'> {}

export class RespuestaExamen extends Model<
  RespuestaExamenAttributes,
  RespuestaExamenCreationAttributes
> implements RespuestaExamenAttributes {
  public id!: number;
  public usuario_id!: number;
  public examen_id!: number;
  public pregunta_id!: number;
  public respuesta_entregada!: string;
  public correcta!: boolean;
  public fecha_respuesta!: Date;
  public porcentaje_aprobacion!: number;
  public aprobado!: boolean;
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
        type: DataTypes.STRING,
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
      porcentaje_aprobacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      aprobado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
