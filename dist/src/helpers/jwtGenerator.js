"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtGenerator = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        if (process.env.SECRETORPRIVATEKEY) {
            jsonwebtoken_1.default.sign(payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '4h'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                }
                else {
                    resolve(token);
                }
            });
        }
    });
};
exports.jwtGenerator = jwtGenerator;
//# sourceMappingURL=jwtGenerator.js.map