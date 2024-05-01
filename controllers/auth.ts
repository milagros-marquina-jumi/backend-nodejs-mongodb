import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import { jwtGenerator } from '../helpers/jwtGenerator';
import { dbConnection } from '../database/config';

class AuthController {
    constructor() {}

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const collection = dbConnection.getCollection('users');
            const user = await collection.findOne({ email });
            const { _id, ...userData } = user;

            if (!user) {
                res.status(400).json({
                    msg: 'Usuario / Contraseña no son correctos - correo'
                });
                return;
            }

            // Si el usuario está inactivo
            if (!user.state) {
                res.status(400).json({
                    msg: 'Usuario / Contraseña no son correctos - estado: false'
                });
                return;
            }

            const validPassword: boolean = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                res.status(400).json({
                    msg: 'Usuario / Contraseña no son correctos - contraseña'
                });
                return;
            };

            const token = await jwtGenerator( _id);

            res.status(200).json({
                user,
                token
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Hable con el administrador'
            });
        }
    }
}

export default AuthController;