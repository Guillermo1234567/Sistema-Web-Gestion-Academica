import express from 'express';
import dotenv from 'dotenv';

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

const app = express();

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

app.use(express.json());

app.use('/roles', rolRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/facultades', facultadRoutes);
app.use('/carreras', carreraRoutes);
app.use('/docentes', docenteRoutes);
app.use('/estudiantes', estudianteRoutes);
app.use('/cursos', cursoRoutes);
app.use('/aulas', aulaRoutes);
app.use('/horarios', horarioRoutes);
app.use('/periodos', periodoAcademicoRoutes);
app.use('/matriculas', matriculaRoutes);
app.use('/detalles-matricula', detalleMatriculaRoutes);

dotenv.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
