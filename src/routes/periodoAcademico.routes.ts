import { Router } from 'express';
import * as periodoController from '../controllers/periodoAcademico.controller';

const router = Router();

router.get('/', periodoController.getPeriodos);

router.get('/:id', periodoController.getPeriodoById);

router.post('/', periodoController.createPeriodo);

router.put('/:id', periodoController.updatePeriodo);

router.delete('/:id', periodoController.deletePeriodo);

export default router;