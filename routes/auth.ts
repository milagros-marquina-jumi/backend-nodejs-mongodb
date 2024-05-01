
import { Router } from 'express';
import { check } from 'express-validator';
import AuthController from '../controllers/auth';

const router = Router();
const service = new  AuthController();

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
], service.login );

export default router;