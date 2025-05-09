import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface FirmaDigitalAttributes {
  id: number;
  firmante_id: number;
  fecha: Date;
  hash_firma: string;
  tipo_firma: string;
  metadata?: object;
}

interface FirmaDigitalCreationAttributes
  extends Optional<FirmaDigitalAttributes, 'id' | 'fecha' | 'metadata'> {}

export class FirmaDigitalModel
  extends Model<FirmaDigitalAttributes, FirmaDigitalCreationAttributes>
  implements FirmaDigitalAttributes
{
  public id!: number;
  public firmante_id!: number;
  public fecha!: Date;
  public hash_firma!: string;
  public tipo_firma!: string;
  public metadata?: object;
}

export const FirmaDigital = sequelize.define<FirmaDigitalModel>('firma_digital', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firmante_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  hash_firma: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tipo_firma: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: 'firmas_digitales',
  timestamps: false,
});
