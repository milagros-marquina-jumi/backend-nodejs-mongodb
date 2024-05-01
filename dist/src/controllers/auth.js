"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtGenerator_1 = require("../helpers/jwtGenerator");
const config_1 = require("../database/config");
class AuthController {
    constructor() { }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const collection = config_1.dbConnection.getCollection('users');
                const user = yield collection.findOne({ email });
                const { _id } = user, userData = __rest(user, ["_id"]);
                if (!user) {
                    res.status(400).json({
                        msg: 'Usuario / Contraseña no son correctos - correo'
                    });
                    return;
                }
                if (!user.state) {
                    res.status(400).json({
                        msg: 'Usuario / Contraseña no son correctos - estado: false'
                    });
                    return;
                }
                const validPassword = bcryptjs_1.default.compareSync(password, user.password);
                if (!validPassword) {
                    res.status(400).json({
                        msg: 'Usuario / Contraseña no son correctos - contraseña'
                    });
                    return;
                }
                ;
                const token = yield (0, jwtGenerator_1.jwtGenerator)(_id);
                res.status(200).json({
                    user,
                    token
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: 'Hable con el administrador'
                });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.js.map