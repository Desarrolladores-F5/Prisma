import { RequestConUsuario } from './validarToken';
import { Response, NextFunction } from 'express';

export const autorizarRol = (...rolesPermitidos: number[]) => {
  return (req: RequestConUsuario, res: Response, next: NextFunction): void => {
    const rolUsuario = req.usuario?.rol_id;

    if (!rolesPermitidos.includes(rolUsuario)) {
      res.status(403).json({ mensaje: 'Acceso denegado: rol no autorizado' });
      return;
    }

    next();
  };
};

// ✅ Exportar middlewares específicos por rol
export const esAdministrador = autorizarRol(1);
export const esSupervisor = autorizarRol(2);
export const esTrabajador = autorizarRol(3);
