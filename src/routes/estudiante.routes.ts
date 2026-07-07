import { Router } from 'express';
import * as estudianteController from '../controllers/estudiante.controller';

const router = Router();

router.get('/', estudianteController.getEstudiantes);

router.get('/:id', estudianteController.getEstudianteById);

router.post('/', estudianteController.createEstudiante);

router.put('/:id', estudianteController.updateEstudiante);

router.delete('/:id', estudianteController.deleteEstudiante);

export default router;