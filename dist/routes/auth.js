"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../controllers/auth"));
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
const service = new auth_1.default();
router.post('/login', [
    (0, express_validator_1.check)('email', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    middlewares_1.validateFields
], service.login);
exports.default = router;
//# sourceMappingURL=auth.js.map