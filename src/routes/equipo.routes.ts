import { Router } from 'express';
import { EquipoController } from '../controllers/equipo.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';
import { validate, createEquipoValidations } from '../validations/equipo.validator';

const router = Router();

router.use(authenticateJWT);

router.get('/', checkRole(['admin', 'user']), EquipoController.getEquipos);

router.get('/mis-equipos', checkRole(['user']), EquipoController.getMyEquipos);

router.post('/', checkRole(['admin']), validate(createEquipoValidations), EquipoController.createEquipo);

router.put('/:id', checkRole(['admin']), validate(createEquipoValidations), EquipoController.updateEquipo);

router.delete('/:id', checkRole(['admin']), EquipoController.deleteEquipo);


export default router;


