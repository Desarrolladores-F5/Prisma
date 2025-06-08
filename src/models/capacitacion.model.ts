import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface CapacitacionAttributes {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  usuario_id: number;
  faena_id: number;
  asistencia: any;
  documento_id?: number;
  activo: boolean;
  fecha_creacion?: Date;
}

interface CapacitacionCreationAttributes extends Optional<CapacitacionAttributes, 'id' | 'documento_id' | 'fecha_creacion'> {}

// ✅ Clase principal
export class Capacitacion extends Model<CapacitacionAttributes, CapacitacionCreationAttributes>
  implements CapacitacionAttributes {
  public id!: number;
  public titulo!: string;
  public descripcion!: string;
  public fecha!: Date;
  public usuario_id!: number;
  public faena_id!: number;
  public asistencia!: any;
  public documento_id?: number;
  public activo!: boolean;
  public readonly fecha_creacion!: Date;
}

// ✅ Función de inicialización del modelo
export function initCapacitacion(sequelize: Sequelize) {
  Capacitacion.init(
    {
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
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      faena_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      asistencia: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      documento_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'capacitaciones',
      timestamps: false,
    }
  );
}
