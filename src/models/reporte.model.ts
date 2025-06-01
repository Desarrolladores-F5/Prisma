import { DataTypes, Sequelize, Model } from 'sequelize';

interface ReporteAttributes {
  id?: number;
  titulo: string;
  descripcion?: string;
  tipo?: string;
  estado?: string;
  prioridad?: string;
  usuario_id: number;
  faena_id: number;
  auditoria_id?: number | null;
  fecha_evento?: Date;
  fecha_creacion?: Date;
  activo?: boolean;
}

export class Reporte extends Model<ReporteAttributes> implements ReporteAttributes {
  public id!: number;
  public titulo!: string;
  public descripcion?: string;
  public tipo?: string;
  public estado?: string;
  public prioridad?: string;
  public usuario_id!: number;
  public faena_id!: number;
  public auditoria_id?: number | null;
  public fecha_evento?: Date;
  public fecha_creacion?: Date;
  public activo?: boolean;
}

export function initReporte(sequelize: Sequelize) {
  Reporte.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    tipo: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.STRING,
    },
    prioridad: {
      type: DataTypes.STRING,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    faena_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    auditoria_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_evento: {
      type: DataTypes.DATE,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    tableName: 'reportes',
    timestamps: false,
  });
}
