import { Router } from 'express';
import * as facultadController from '../controllers/facultad.controller';

const router = Router();

router.get('/', facultadController.getFacultades);

router.get('/:id', facultadController.getFacultadById);

router.post('/', facultadController.createFacultad);

router.put('/:id', facultadController.updateFacultad);

router.delete('/:id', facultadController.deleteFacultad);

export default router;