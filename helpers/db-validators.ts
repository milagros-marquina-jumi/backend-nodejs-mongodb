import { ObjectId } from "mongodb";
import { dbConnection } from "../database/config";

export const roleValidation = async (rol: 'ADMIN_ROLE' | 'USER_ROLE') => {
    const collection = dbConnection.getCollection('roles');
    const rolDb = await collection.findOne({ rol });
    if (!rolDb) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

export const existingEmail = async (email: string) => {
    // Verificar si el correo existe en la base de datos 
    const collection = dbConnection.getCollection('users');
    const emailDb = await collection.findOne({ email });
    if (emailDb) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
}

export const searchUserById = async (id: string) => {
    // Verificar si el usuario exite 
    const collection = dbConnection.getCollection('users');
    const userDb = await collection.findOne({ _id: new ObjectId(id) });
    if (!userDb) {
        throw new Error(`El id no existe ${id}`);
    }
}
