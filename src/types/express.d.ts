// src/types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        nombre: string;
        rol_id: number;
        faena_id?: number;
      };
    }
  }
}
