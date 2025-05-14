import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

export interface ProtocoloAttributes {
  id: number;
  nombre: string;
  descripcion?: string;
  version?: string;
  responsable_id: number;
  empresa_id: number;
  faena_id: number;
  vigente: boolean;
  fecha_emision?: Date;
  fecha_vigencia?: Date;
  fecha_creacion?: Date;
  activo: boolean; // ✅ CAMPO AGREGADO
}

export interface ProtocoloCreationAttributes extends Optional<
  ProtocoloAttributes,
  'id' | 'descripcion' | 'version' | 'vigente' | 'fecha_emision' | 'fecha_vigencia' | 'fecha_creacion' | 'activo' // ✅ INCLUIDO EN OPTIONAL
> {}

export class Protocolo extends Model<ProtocoloAttributes, ProtocoloCreationAttributes>
  implements ProtocoloAttributes {
  public id!: number;
  public nombre!: string;
  public descripcion?: string;
  public version?: string;
  public responsable_id!: number;
  public empresa_id!: number;
  public faena_id!: number;
  public vigente!: boolean;
  public fecha_emision?: Date;
  public fecha_vigencia?: Date;
  public fecha_creacion?: Date;
  public activo!: boolean; // ✅ PROPIEDAD EN LA CLASE
}

export function initProtocolo(sequelize: Sequelize): void {
  Protocolo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      version: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      responsable_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      faena_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vigente: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      fecha_emision: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      fecha_vigencia: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
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
      modelName: 'Protocolo',
      tableName: 'protocolos',
      timestamps: false,
    }
  );
}
