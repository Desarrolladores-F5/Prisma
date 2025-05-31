import { DataTypes, Model, Sequelize } from 'sequelize';

export class Comentario extends Model {
  public id!: number;
  public autor_id!: number;
  public mensaje!: string;
  public entidad_tipo!: string;
  public entidad_id!: number;
  public fecha!: Date;
}

export function initComentario(sequelize: Sequelize) {
  Comentario.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    autor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    entidad_tipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    entidad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'comentario',
    tableName: 'comentarios',
    timestamps: false,
  });
}
