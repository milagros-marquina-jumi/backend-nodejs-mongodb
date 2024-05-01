import { NextFunction, Request, Response } from 'express';

export const adminRole = ( req: Request, res: Response, next: NextFunction) => {

    if ( !req.body) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    if ( req.body.user.rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${  req.body.user.rol.name } no es administrador - No puede hacer esto`
        });
    }

    next();
}

export const hasRole = ( ...roles :any[] ) => {
    return (req: Request, res: Response, next: NextFunction) => {

        if (  !req.body ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes(  !req.body.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }
}