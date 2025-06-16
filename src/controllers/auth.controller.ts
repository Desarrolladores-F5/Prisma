// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { Usuario } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
      return;
    }

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
      return;
    }

    const passwordValido = bcrypt.compareSync(contraseña, usuario.contraseña_hash);

    if (!passwordValido) {
      res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol_id: usuario.rol_id,
        faena_id: usuario.faena_id
      },
      process.env.JWT_SECRET || 'secreto_prisma',
      { expiresIn: '4h' }
    );

    res.status(200).json({
      mensaje: '✅ Autenticación exitosa',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol_id: usuario.rol_id,
        faena_id: usuario.faena_id
      }
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ mensaje: 'Error interno en login', error });
  }
};
