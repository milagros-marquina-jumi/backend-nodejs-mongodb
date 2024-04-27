import dotenv from 'dotenv';
import Server from './modules/server';


// Configurar dot.env
dotenv.config();

const server = new Server();


server.listen();