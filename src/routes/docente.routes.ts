import { Router } from 'express';
import * as docenteController from '../controllers/docente.controller';

const router = Router();

router.get('/', docenteController.getDocentes);

router.get('/:id', docenteController.getDocenteById);

router.post('/', docenteController.createDocente);

router.put('/:id', docenteController.updateDocente);

router.delete('/:id', docenteController.deleteDocente);

export default router;