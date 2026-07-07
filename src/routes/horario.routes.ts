import { Router } from 'express';
import * as horarioController from '../controllers/horario.controller';

const router = Router();

router.get('/', horarioController.getHorarios);

router.get('/:id', horarioController.getHorarioById);

router.post('/', horarioController.createHorario);

router.put('/:id', horarioController.updateHorario);

router.delete('/:id', horarioController.deleteHorario);

export default router;