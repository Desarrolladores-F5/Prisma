// src/models/rel_documentos_usuarios.model.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import type { DocumentoModel } from './documento.model';
import type { Usuario } from './usuario.model';

export interface RelacionDocumentoUsuarioAttributes {
  id: number;
  documento_id: number;
  usuario_id: number;
  fecha_asignacion?: Date;
  activo: boolean;
  recepcionado?: boolean;
  fecha_recepcion?: Date | null;
}

interface RelacionDocumentoUsuarioCreationAttributes
  extends Optional<
    RelacionDocumentoUsuarioAttributes,
    'id' | 'fecha_asignacion' | 'activo' | 'recepcionado' | 'fecha_recepcion'
  > {}

export class RelacionDocumentoUsuarioModel
  extends Model<
    RelacionDocumentoUsuarioAttributes,
    RelacionDocumentoUsuarioCreationAttributes
  >
  implements RelacionDocumentoUsuarioAttributes
{
  public id!: number;
  public documento_id!: number;
  public usuario_id!: number;
  public fecha_asignacion!: Date;
  public activo!: boolean;
  public recepcionado!: boolean;
  public fecha_recepcion!: Date | null;

  // ✅ Relaciones correctamente tipadas
  public documento?: DocumentoModel;
  public usuario?: Usuario;
}

export const initRelDocumentoUsuario = (sequelize: Sequelize) => {
  RelacionDocumentoUsuarioModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      documento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'documentos',
          key: 'id',
        },
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
      },
      fecha_asignacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      recepcionado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      fecha_recepcion: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'rel_documentos_usuarios',
      modelName: 'RelDocumentoUsuario',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['documento_id', 'usuario_id'],
        },
      ],
    }
  );
};

export const RelDocumentoUsuario = RelacionDocumentoUsuarioModel;
