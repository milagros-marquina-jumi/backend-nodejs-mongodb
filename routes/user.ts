
import { Router } from 'express';
import { check } from 'express-validator';
import UserController from '../controllers/user';

const router = Router();

const service = new UserController();

router.get('/', service.getUsers);
router.get('/user', service.getUser);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('area', 'El area de trabajo es obligatorio').not().isEmpty(),
], service.createUser);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
], service.updateUser);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
], service.deleteUser);

export default router;