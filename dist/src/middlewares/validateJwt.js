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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const cache_manager_1 = require("cache-manager");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../database/config");
const mongodb_1 = require("mongodb");
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const memoryCache = yield (0, cache_manager_1.caching)('memory', {
        max: 100,
        ttl: 10 * 1000,
    });
    yield memoryCache.set('host', req.headers.host, 5000);
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        if (process.env.SECRETORPRIVATEKEY) {
            const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
            const collection = config_1.dbConnection.getCollection('users');
            const user = yield collection.findOne({ _id: new mongodb_1.ObjectId(uid) });
            if (!user) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario no existe DB'
                });
            }
            if (!user.state) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario con estado: false'
                });
            }
            req.body.user = user;
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validateJwt.js.map