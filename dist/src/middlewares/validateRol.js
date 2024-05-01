"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = exports.adminRole = void 0;
const adminRole = (req, res, next) => {
    if (!req.body) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    if (req.body.user.rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${req.body.user.rol.name} no es administrador - No puede hacer esto`
        });
    }
    next();
};
exports.adminRole = adminRole;
const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
        if (!roles.includes(!req.body.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    };
};
exports.hasRole = hasRole;
//# sourceMappingURL=validateRol.js.map