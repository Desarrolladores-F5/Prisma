import { Request, Response } from 'express';
import { Rol } from '../models/rol.model';

export const crearRol = async (req: Request, res: Response) => {
  try {
    const rol = await Rol.create(req.body);
    res.status(201).json(rol);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el rol', error });
  }
};

export const listarRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar roles', error });
  }
};
