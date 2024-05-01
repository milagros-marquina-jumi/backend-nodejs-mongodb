
import { caching } from 'cache-manager';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { dbConnection } from '../database/config';
import { ObjectId } from 'mongodb';

export const validateJWT = async( req: Request, res: Response, next: NextFunction) => {
    const memoryCache = await caching('memory', {
        max: 100,
        ttl: 10 * 1000,
      });
    await memoryCache.set('host', req.headers.host, 5000);

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        if(process.env.SECRETORPRIVATEKEY){

            const { uid }:any = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

            const collection = dbConnection.getCollection('users');
            const user = await collection.findOne({ _id: new ObjectId(uid) });

            if( !user ) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario no existe DB'
                })
            }

            if ( !user.state ) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario con estado: false'
                })
            }

            req.body.user = user;
            next();
        }

    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}
