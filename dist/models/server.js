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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("../routes"));
const config_1 = require("../database/config");
class Server {
    constructor() {
        this.options = {
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
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.swaggerSpec = (0, swagger_jsdoc_1.default)(this.options);
        this.connectDatabase();
        this.middlewares();
        this.routes();
    }
    connectDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.dbConnection.connect(`${process.env.MOGODB_CNN}`);
                console.log('Database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(this.swaggerSpec));
        (0, routes_1.default)(this.app);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map