
import { Router } from 'express';
import { check } from 'express-validator';
import { adminRole, validateFields, validateJWT } from '../middlewares';
import UserController from '../controllers/user';
import { existingEmail, roleValidation, searchUserById } from '../helpers/db-validators';

const router = Router();

const service = new UserController();

router.get('/', validateJWT, service.getUsers);
router.get('/user', validateJWT, service.getUser);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('area', 'El area de trabajo es obligatorio').not().isEmpty(),
    check('email',).custom(existingEmail),
    check('rol').custom(roleValidation),
    validateFields
], service.createUser);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(searchUserById),
    check('rol').custom(roleValidation),
    validateFields,
], service.updateUser);

router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existingEmail),
    validateFields,
], service.deleteUser);


export default router;