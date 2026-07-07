import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import rolRoutes from './routes/rol.routes';
import usuarioRoutes from './routes/usuario.routes';
import facultadRoutes from './routes/facultad.routes';
import carreraRoutes from './routes/carrera.routes';
import docenteRoutes from './routes/docente.routes';
import estudianteRoutes from './routes/estudiante.routes';
import cursoRoutes from './routes/curso.routes';
import aulaRoutes from './routes/aula.routes';
import horarioRoutes from './routes/horario.routes';
import periodoAcademicoRoutes from './routes/periodoAcademico.routes';
import matriculaRoutes from './routes/matricula.routes';
import detalleMatriculaRoutes from './routes/detalleMatricula.routes';
import { apiLimiter } from './middlewares/rate-limit';
import { apiKeyAuth } from './middlewares/api-key';

const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }

    next();
});

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb'}));
app.use(apiLimiter);

app.use(express.json());

app.use('/roles', apiKeyAuth, rolRoutes);
app.use('/usuarios', apiKeyAuth, usuarioRoutes);
app.use('/facultades', apiKeyAuth, facultadRoutes);
app.use('/carreras', apiKeyAuth, carreraRoutes);
app.use('/docentes', apiKeyAuth, docenteRoutes);
app.use('/estudiantes', apiKeyAuth, estudianteRoutes);
app.use('/cursos', apiKeyAuth, cursoRoutes);
app.use('/aulas', apiKeyAuth, aulaRoutes);
app.use('/horarios', apiKeyAuth, horarioRoutes);
app.use('/periodos', apiKeyAuth, periodoAcademicoRoutes);
app.use('/matriculas', apiKeyAuth, matriculaRoutes);
app.use('/detalles-matricula', apiKeyAuth, detalleMatriculaRoutes);

dotenv.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
