import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import bcryptjs from 'bcryptjs';
import { dbConnection } from '../database/config';
import { UserSearchParams } from '../types';

class UserController {

    constructor() { }

    async getUser(req: Request, res: Response): Promise<void> {
        const { name, email } = req.query;

        const collection = dbConnection.getCollection('users');

        const userByName = await collection.findOne({ name });
        if (userByName) {
            res.json({ userByName });
        }

        const userByEmail = await collection.findOne({ email });
        if (userByEmail) {
            res.json({ userByEmail });
        }

        res.status(401).json({ msg: 'usuario no existe DB' })
    };

    async getUsers(req: Request, res: Response): Promise<void> {
        const { name, email, page = 1, limit = 10, sortField = 'name', sortOrder = 'asc' } = req.query;

        const filter: UserSearchParams = {};

        if (name) filter['name'] = { $regex: name.toString(), $options: 'i' };
        if (email) filter['email'] = { $regex: email.toString(), $options: 'i' };

        const options = {
            limit: parseInt(limit as string),
            skip: (parseInt(page as string) - 1) * parseInt(limit as string),
            sort: { [`${sortField}`]: sortOrder === 'asc' ? 1 : -1 } as any
        }
        const collection = dbConnection.getCollection('users');
        const users = await collection.find(filter, options).toArray();

        res.json({ users });
    };

    async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password, rol } = req.body;

        const newUser = { name, email, password, rol , state:true}
        const salt = bcryptjs.genSaltSync();
        newUser.password = bcryptjs.hashSync(password, salt);

        const collection = dbConnection.getCollection('users');
        await collection.insertOne(newUser);

        res.status(200).json({
            newUser
        });
    };

    async updateUser(req: Request, res: Response): Promise<void> {

        const { id } = req.params;
        const { _id, password, google, email, ...resUser } = req.body;
        if (password) {
            const salt = bcryptjs.genSaltSync();
            resUser.password = bcryptjs.hashSync(password, salt);
        }

        const collection = dbConnection.getCollection('users');
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: resUser });

        res.status(200).json({
            msg: "el usuario fue actualizado",

        });
    };

    async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const collection = dbConnection.getCollection('users');
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: { state: false } });

        res.status(200).json({
            msg: "el usuario fue eliminado",
        });
    };
}

export default UserController;