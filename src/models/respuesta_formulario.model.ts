import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { Usuario } from './usuario.model'; // ✅ Asegúrate de importar correctamente

export interface RespuestaFormularioAttributes {
  id: number;
  formulario_id: number;
  usuario_id?: number;
  respuestas_json: object;
  fecha_respuesta?: Date;
  activo: boolean;
  estado_firma?: string;
}

export interface RespuestaFormularioCreationAttributes
  extends Optional<
    RespuestaFormularioAttributes,
    'id' | 'usuario_id' | 'fecha_respuesta' | 'activo' | 'estado_firma'
  > {}

export class RespuestaFormulario
  extends Model<RespuestaFormularioAttributes, RespuestaFormularioCreationAttributes>
  implements RespuestaFormularioAttributes
{
  public id!: number;
  public formulario_id!: number;
  public usuario_id?: number;
  public respuestas_json!: object;
  public fecha_respuesta!: Date;
  public activo!: boolean;
  public estado_firma?: string;

  // ✅ Asociación opcional (no es parte de la base de datos)
  public usuario?: Usuario;
}

export function initRespuestaFormulario(sequelize: Sequelize): void {
  RespuestaFormulario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      formulario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
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
      estado_firma: {
        type: DataTypes.STRING,
        defaultValue: 'sin_firma',
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

// ✅ Asociación con Usuario (relación belongsTo)
export function asociarRespuestaFormulario(): void {
  RespuestaFormulario.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });
}
