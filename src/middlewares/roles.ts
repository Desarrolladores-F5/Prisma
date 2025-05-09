import { autorizarRol } from './autorizarRol';

// Roles del sistema según tu base de datos:
export const esAdministrador = autorizarRol(1);
export const esSupervisor = autorizarRol(2);
export const esTrabajador = autorizarRol(3);
