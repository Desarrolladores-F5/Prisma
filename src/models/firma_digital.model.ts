import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface FirmaDigitalAttributes {
  id: number;
  firmante_id: number;
  fecha: Date;
  hash_firma: string;
  tipo_firma: string;
  metadata?: object;
}

export interface FirmaDigitalCreationAttributes
  extends Optional<FirmaDigitalAttributes, 'id' | 'fecha' | 'metadata'> {}

export class FirmaDigital extends Model<FirmaDigitalAttributes, FirmaDigitalCreationAttributes>
  implements FirmaDigitalAttributes {
  public id!: number;
  public firmante_id!: number;
  public fecha!: Date;
  public hash_firma!: string;
  public tipo_firma!: string;
  public metadata?: object;
}

export function initFirmaDigital(sequelize: Sequelize): void {
  FirmaDigital.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firmante_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Borra la firma si se borra el usuario firmante
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      hash_firma: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tipo_firma: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'FirmaDigital',
      tableName: 'firmas_digitales',
      timestamps: false,
    }
  );
}
