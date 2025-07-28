// src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import sequelize from './config/database';
import './models'; // Importa todos los modelos y relaciones

dotenv.config();

const app = express();

// ✅ Configuración general de CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(helmet());
app.use(express.json());

// ✅ Middleware CORS específico para archivos estáticos (firmas, adjuntos, etc.)
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); 
  next();
});
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ✅ Importar rutas
import auditoriaRoutes from './routes/auditoria.routes';
import authRoutes from './routes/auth.routes';
import capacitacionRoutes from './routes/capacitacion.routes';
import comentarioRoutes from './routes/comentario.routes';
import documentoRoutes from './routes/documento.routes';
import empresaRoutes from './routes/empresa.routes';
import eppRoutes from './routes/epp.routes';
import estadisticaRoutes from './routes/estadistica.routes';
import faenaRoutes from './routes/faena.routes';
import firmaRoutes from './routes/firma_digital.routes';
import formularioRoutes from './routes/formulario.routes';
import historialCambioRoutes from './routes/historial_cambio.routes';
import inspeccionRoutes from './routes/inspeccion.routes';
import medidaRoutes from './routes/medida_correctiva.routes';
import notificacionRoutes from './routes/notificacion.routes';
import reporteRoutes from './routes/reporte.routes';
import respuestaFormularioRoutes from './routes/respuesta_formulario.routes';
import rolRoutes from './routes/rol.routes';
import uploadRoutes from './routes/upload.routes';
import usuarioRoutes from './routes/usuario.routes';
import examenRoutes from './routes/examen.routes';
import preguntaExamenRoutes from './routes/pregunta_examen.routes';
import respuestaExamenRoutes from './routes/respuesta_examen.routes';
import relDocumentoUsuarioRoutes from './routes/rel_documentos_usuarios.routes';

// ✅ Asociar rutas
app.use('/api/auditorias', auditoriaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/capacitaciones', capacitacionRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/documentos', documentoRoutes); // ← Ruta principal para documentos
app.use('/api/empresas', empresaRoutes);
app.use('/api/epp', eppRoutes);
app.use('/api/estadisticas', estadisticaRoutes);
app.use('/api/faenas', faenaRoutes);
app.use('/api/firmas', firmaRoutes);
app.use('/api/formularios', formularioRoutes);
app.use('/api/historial-cambios', historialCambioRoutes);
app.use('/api/inspecciones', inspeccionRoutes);
app.use('/api/medidas', medidaRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/respuestas-formulario', respuestaFormularioRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/examenes', examenRoutes);
app.use('/api/preguntas-examen', preguntaExamenRoutes);
app.use('/api/respuestas-examen', respuestaExamenRoutes);

// ✅ Rutas para relaciones documento-usuario
app.use('/api/rel-documentos-usuarios', relDocumentoUsuarioRoutes); // ← Solo aquí

// ✅ Ruta raíz
app.get('/', (_req, res) => {
  res.send('🚀 Backend Prisma funcionando');
});

// ✅ Puerto y conexión
const PORT = process.env.PORT || 3001;

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
