// src/models/pregunta_examen.model.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface PreguntaExamenAttributes {
  id: number;
  examen_id: number;
  enunciado: string;
  alternativas: string[]; // almacenadas en JSON
  respuesta_correcta: string;
  fecha_creacion?: Date;
  activo: boolean;
}

export interface PreguntaExamenCreationAttributes
  extends Optional<PreguntaExamenAttributes, 'id' | 'fecha_creacion' | 'activo'> {}

export class PreguntaExamen
  extends Model<PreguntaExamenAttributes, PreguntaExamenCreationAttributes>
  implements PreguntaExamenAttributes
{
  public id!: number;
  public examen_id!: number;
  public enunciado!: string;
  public alternativas!: string[];
  public respuesta_correcta!: string;
  public fecha_creacion!: Date;
  public activo!: boolean;
}

export function initPreguntaExamen(sequelize: Sequelize): void {
  PreguntaExamen.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      examen_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'examenes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      enunciado: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      alternativas: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: 'Array de alternativas posibles en formato JSON',
      },
      respuesta_correcta: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'PreguntaExamen',
      tableName: 'preguntas_examen',
      timestamps: false,
    }
  );
}
