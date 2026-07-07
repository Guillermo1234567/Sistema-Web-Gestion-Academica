import { Router } from 'express';
import * as aulaController from '../controllers/aula.controller';

const router = Router();

router.get('/', aulaController.getAulas);

router.get('/:id', aulaController.getAulaById);

router.post('/', aulaController.createAula);

router.put('/:id', aulaController.updateAula);

router.delete('/:id', aulaController.deleteAula);

export default router;