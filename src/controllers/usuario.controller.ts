import { Request, Response } from 'express';
import { Usuario, Rol, Faena } from '../models';
import bcrypt from 'bcryptjs';

const tiposPermitidos = ['Plazo fijo', 'Indefinido', 'Honorarios', 'Jornada parcial'];

// Crear nuevo usuario
export const crearUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contraseña, ...datosRestantes } = req.body;

    if (!tiposPermitidos.includes(datosRestantes.tipo_contrato)) {
      res.status(400).json({ mensaje: '❌ Tipo de contrato no válido' });
      return;
    }

    if (!contraseña || contraseña.trim() === '') {
      res.status(400).json({ mensaje: 'La contraseña es obligatoria' });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contraseña, salt);

    const usuario = await Usuario.create({
      ...datosRestantes,
      contraseña_hash: hash,
      salt: salt,
    });

    res.status(201).json({
      mensaje: '✅ Usuario creado correctamente',
      usuario,
    });
  } catch (error: any) {
    console.error('❌ Error al crear usuario:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({
        mensaje: 'El RUT o el correo ya están registrados',
        campo: error.errors[0].path,
      });
      return;
    }

    res.status(500).json({
      mensaje: '❌ Error interno al crear usuario',
      error,
    });
  }
};

// Obtener todos los usuarios activos
export const obtenerUsuarios = async (_req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await Usuario.findAll({
      where: { activo: true },
      include: [
        {
          model: Rol,
          as: 'rol',
          attributes: ['id', 'nombre', 'descripcion'],
        },
        {
          model: Faena,
          as: 'faena',
          attributes: ['id', 'nombre'],
        },
      ],
    });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({
      mensaje: '❌ Error al obtener usuarios',
      error,
    });
  }
};

// Eliminar usuario (marcar como inactivo)
export const eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
      return;
    }

    await usuario.update({ activo: false });

    res.json({ mensaje: '✅ Usuario desactivado correctamente' });
  } catch (error) {
    console.error('❌ Error al desactivar usuario:', error);
    res.status(500).json({ mensaje: '❌ Error al desactivar usuario', error });
  }
};

// Reactivar usuario
export const reactivarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
      return;
    }

    await usuario.update({ activo: true });

    res.json({ mensaje: '✅ Usuario reactivado correctamente' });
  } catch (error) {
    console.error('❌ Error al reactivar usuario:', error);
    res.status(500).json({ mensaje: '❌ Error al reactivar usuario', error });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { contraseña, ...datosRestantes } = req.body;

    if (!tiposPermitidos.includes(datosRestantes.tipo_contrato)) {
      res.status(400).json({ mensaje: '❌ Tipo de contrato no válido' });
      return;
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
      return;
    }

    if (contraseña && contraseña.trim() !== '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(contraseña, salt);
      datosRestantes.contraseña_hash = hash;
      datosRestantes.salt = salt;
    }

    await usuario.update(datosRestantes);

    res.json({ mensaje: '✅ Usuario actualizado', id: usuario.getDataValue('id') });
  } catch (error: any) {
    console.error('❌ Error al actualizar usuario:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({
        mensaje: 'El RUT o el correo ya están registrados',
        campo: error.errors[0].path,
      });
      return;
    }

    res.status(500).json({ mensaje: '❌ Error al actualizar usuario', error });
  }
};

// Contar usuarios
export const contarUsuarios = async (_req: Request, res: Response): Promise<void> => {
  try {
    const total = await Usuario.count({ where: { activo: true } });
    res.json({ total });
  } catch (error) {
    console.error('❌ Error al contar usuarios:', error);
    res.status(500).json({ mensaje: '❌ Error al contar usuarios', error });
  }
};

// Obtener usuarios activos sin relaciones
export const obtenerUsuariosActivos = async (_req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll({ where: { activo: true } });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al obtener usuarios activos', error });
  }
};
