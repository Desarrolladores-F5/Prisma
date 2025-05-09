// src/middlewares/validarToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface RequestConUsuario extends Request {
  usuario?: any;
}

export const validarToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ mensaje: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta');
    (req as RequestConUsuario).usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
    return;
  }
};

export const esAdministrador = (req: RequestConUsuario, res: Response, next: NextFunction): void => {
  if (req.usuario?.rol_id !== 1) {
    res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol administrador' });
    return;
  }
  next();
};
