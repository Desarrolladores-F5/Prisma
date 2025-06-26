// src/models/documento.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface DocumentoAttributes {
  id: number;
  nombre: string;
  tipo: string;
  url: string;
  version: string;
  fecha_creacion?: Date;
  activo: boolean;
  usuario_id: number; 
}

interface DocumentoCreationAttributes
  extends Optional<DocumentoAttributes, 'id' | 'fecha_creacion'> {}

export class DocumentoModel
  extends Model<DocumentoAttributes, DocumentoCreationAttributes>
  implements DocumentoAttributes {
  public id!: number;
  public nombre!: string;
  public tipo!: string;
  public url!: string;
  public version!: string;
  public fecha_creacion!: Date;
  public activo!: boolean;
  public usuario_id!: number;
}

export const Documento = sequelize.define<DocumentoModel>('documento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  version: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id',
    },
  },
}, {
  tableName: 'documentos',
  timestamps: false,
});
