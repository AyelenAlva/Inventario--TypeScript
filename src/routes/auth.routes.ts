import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';
import { validate, loginValidations } from '../validations/equipo.validator';

const router = Router();

router.post('/login', validate(loginValidations), AuthController.login);

// POST api/auth/register: PROTEGIDO (Solo Admin)
router.post('/register', authenticateJWT, checkRole(['admin']), AuthController.register);

export default router;