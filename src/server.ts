// src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import sequelize from './config/database';
import './models'; // Importa todos los modelos y relaciones

// Cargar variables de entorno
dotenv.config();

// Inicializar app Express
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// ✅ Servir archivos estáticos subidos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ✅ Rutas importadas
import rolRoutes from './routes/rol.routes';
import usuarioRoutes from './routes/usuario.routes';
import authRoutes from './routes/auth.routes';
import reporteRoutes from './routes/reporte.routes';
import faenaRoutes from './routes/faena.routes';
import auditoriaRoutes from './routes/auditoria.routes';
import empresaRoutes from './routes/empresa.routes';
import capacitacionRoutes from './routes/capacitacion.routes';
import eppRoutes from './routes/epp.routes';
import notificacionRoutes from './routes/notificacion.routes';
import documentoRoutes from './routes/documento.routes';
import medidaRoutes from './routes/medida_correctiva.routes';
import inspeccionRoutes from './routes/inspeccion.routes';
import firmaRoutes from './routes/firma_digital.routes';
import archivoAdjuntoRoutes from './routes/archivoAdjunto.routes';
import uploadRoutes from './routes/upload.routes'; // ✅ Debe ir al final si maneja archivos

// ✅ Asociar rutas
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/faenas', faenaRoutes);
app.use('/api/auditorias', auditoriaRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/capacitaciones', capacitacionRoutes);
app.use('/api/epp', eppRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/documentos', documentoRoutes);
app.use('/api/medidas', medidaRoutes);
app.use('/api/inspecciones', inspeccionRoutes);
app.use('/api/firmas', firmaRoutes);
app.use('/api/archivos', archivoAdjuntoRoutes);
app.use('/api/upload', uploadRoutes); // Puede manejar carga de archivos

// ✅ Ruta raíz
app.get('/', (_req, res) => {
  res.send('🚀 Backend Prisma funcionando');
});

// Puerto del servidor
const PORT = process.env.PORT || 3001;

// Conectar base de datos y arrancar servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Modelos sincronizados');
    app.listen(PORT, () => {
      console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error('❌ Error al iniciar el servidor:', error);
  });
