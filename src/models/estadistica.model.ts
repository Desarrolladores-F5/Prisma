import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface EstadisticaAttributes {
  id: number;
  tipo: string;
  datos: object;
  descripcion?: string;
  faena_id?: number;
  generado_por?: number;
  fecha_generacion?: Date;
  numero_certificado?: string;
  organismo_admin?: string;
  cotizacion_riesgo_presunto?: number;
}

export interface EstadisticaCreationAttributes
  extends Optional<
    EstadisticaAttributes,
    | 'id'
    | 'descripcion'
    | 'faena_id'
    | 'generado_por'
    | 'fecha_generacion'
    | 'numero_certificado'
    | 'organismo_admin'
    | 'cotizacion_riesgo_presunto'
  > {}

export class Estadistica
  extends Model<EstadisticaAttributes, EstadisticaCreationAttributes>
  implements EstadisticaAttributes
{
  public id!: number;
  public tipo!: string;
  public datos!: object;
  public descripcion?: string;
  public faena_id?: number;
  public generado_por?: number;
  public fecha_generacion?: Date;
  public numero_certificado?: string;
  public organismo_admin?: string;
  public cotizacion_riesgo_presunto?: number;
}

export function initEstadistica(sequelize: Sequelize): void {
  Estadistica.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      datos: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      faena_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      generado_por: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      fecha_generacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      numero_certificado: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      organismo_admin: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cotizacion_riesgo_presunto: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Estadistica',
      tableName: 'estadisticas',
      timestamps: false,
    }
  );
}
