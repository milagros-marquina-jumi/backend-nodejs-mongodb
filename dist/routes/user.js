"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const user_1 = __importDefault(require("../controllers/user"));
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
const service = new user_1.default();
router.get('/', middlewares_1.validateJWT, service.getUsers);
router.get('/user', middlewares_1.validateJWT, service.getUser);
router.post('/', [
    middlewares_1.validateJWT,
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('area', 'El area de trabajo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email').custom(db_validators_1.existingEmail),
    (0, express_validator_1.check)('rol').custom(db_validators_1.roleValidation),
    middlewares_1.validateFields
], service.createUser);
router.put('/:id', [
    middlewares_1.validateJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.searchUserById),
    (0, express_validator_1.check)('rol').custom(db_validators_1.roleValidation),
    middlewares_1.validateFields,
], service.updateUser);
router.delete('/:id', [
    middlewares_1.validateJWT,
    middlewares_1.adminRole,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingEmail),
    middlewares_1.validateFields,
], service.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map