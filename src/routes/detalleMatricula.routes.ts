import { Router } from 'express';
import * as detalleController from '../controllers/detalleMatricula.controller';

const router = Router();

router.get('/', detalleController.getDetallesMatricula);

router.get('/:id', detalleController.getDetalleMatriculaById);

router.post('/', detalleController.createDetalleMatricula);

router.delete('/:id', detalleController.deleteDetalleMatricula);

export default router;