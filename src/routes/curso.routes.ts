import { Router } from 'express';
import * as cursoController from '../controllers/curso.controller';

const router = Router();

router.get('/', cursoController.getCursos);

router.get('/:id', cursoController.getCursoById);

router.post('/', cursoController.createCurso);

router.put('/:id', cursoController.updateCurso);

router.delete('/:id', cursoController.deleteCurso);

export default router;