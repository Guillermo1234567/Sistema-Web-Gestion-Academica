import { Router } from 'express';
import * as matriculaController from '../controllers/matricula.controller';

const router = Router();

router.get('/', matriculaController.getMatriculas);

router.get('/:id', matriculaController.getMatriculaById);

router.post('/', matriculaController.createMatricula);

router.put('/:id', matriculaController.updateMatricula);

router.delete('/:id', matriculaController.deleteMatricula);

export default router;