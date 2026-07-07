import { Router } from 'express';
import * as carreraController from '../controllers/carrera.controller';

const router = Router();

router.get('/', carreraController.getCarreras);

router.get('/:id', carreraController.getCarreraById);

router.post('/', carreraController.createCarrera);

router.put('/:id', carreraController.updateCarrera);

router.delete('/:id', carreraController.deleteCarrera);

export default router;