import express, { Express } from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import routerApi from '../routes';
import { dbConnection } from '../database/config';
require('express-async-errors');

class Server {

    private app: Express;
    private port: string;
    private options = {
        swaggerDefinition: {
            info: {
                title: 'Base node api',
                version: '1.0.0',
                description: ''
            },
            servers: [
                {
                    url: process.env.API_URL,
                    description: 'Development server'
                }
            ]
        },
        apis: ['./routes/*.ts']
    };
    private swaggerSpec: object

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.swaggerSpec = swaggerJSDoc(this.options);

        this.connectDatabase();
        this.middlewares();
        this.routes();
    }

    async connectDatabase() {
        try {
            await dbConnection.connect(`${process.env.MOGODB_CNN}`);
            console.log('Database online');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
        routerApi(this.app);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ' + this.port);
        })
    }
}

export default Server;