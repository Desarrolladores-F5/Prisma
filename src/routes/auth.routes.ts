// src/routes/auth.routes.ts
import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login); // ✅ define la ruta POST

export default router; // ✅ exporta un Router, NO una función
