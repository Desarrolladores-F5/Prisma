// src/models/usuario.model.ts
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Tipos de atributos
export interface UsuarioAttributes {
  id: number;
  rut: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  fecha_nacimiento?: Date;
  fecha_contrato?: Date;
  tipo_contrato?: string;
  rol_id: number;
  faena_id?: number;
  contraseña_hash: string;
  salt: string;
  activo: boolean;
  fecha_creacion?: Date;
  firma_imagen_url?: string; 
}

// Tipos para creación
export interface UsuarioCreationAttributes
  extends Optional<
    UsuarioAttributes,
    'id' | 'telefono' | 'faena_id' | 'fecha_nacimiento' | 'fecha_contrato' | 'tipo_contrato' | 'fecha_creacion' | 'firma_imagen_url'
  > {}

export class Usuario
  extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes
{
  public id!: number;
  public rut!: string;
  public nombre!: string;
  public apellido!: string;
  public correo!: string;
  public telefono?: string;
  public fecha_nacimiento?: Date;
  public fecha_contrato?: Date;
  public tipo_contrato?: string;
  public rol_id!: number;
  public faena_id?: number;
  public contraseña_hash!: string;
  public salt!: string;
  public activo!: boolean;
  public fecha_creacion?: Date;
  public firma_imagen_url?: string; 
}

export function initUsuario(sequelize: Sequelize): typeof Usuario {
  Usuario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      rut: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      fecha_contrato: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      tipo_contrato: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      faena_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      contraseña_hash: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      salt: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      firma_imagen_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'usuarios',
      sequelize,
      timestamps: false,
    }
  );

  return Usuario;
}
