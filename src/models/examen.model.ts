import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface ExamenAttributes {
  id: number;
  titulo: string;
  descripcion?: string;
  capacitacion_id: number;
  fecha_creacion?: Date;
  activo: boolean;
}

export interface ExamenCreationAttributes
  extends Optional<ExamenAttributes, 'id' | 'descripcion' | 'fecha_creacion'> {}

export class Examen extends Model<ExamenAttributes, ExamenCreationAttributes>
  implements ExamenAttributes {
  public id!: number;
  public titulo!: string;
  public descripcion?: string;
  public capacitacion_id!: number;
  public fecha_creacion?: Date;
  public activo!: boolean;
}

export function initExamen(sequelize: Sequelize): void {
  Examen.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      capacitacion_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'capacitaciones',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se elimina el examen si se elimina la capacitación
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
      modelName: 'Examen',
      tableName: 'examenes',
      timestamps: false,
    }
  );
}
