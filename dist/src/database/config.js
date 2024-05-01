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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongodb_1 = require("mongodb");
class MongoDBConnection {
    constructor() { }
    ;
    connect(mongoUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client = new mongodb_1.MongoClient(mongoUrl);
                this.client && (yield this.client.connect());
                console.log('Connected to MongoDB');
            }
            catch (error) {
                console.error('Error connecting to MongoDB:', error);
            }
        });
    }
    getCollection(collectionName) {
        if (this.client) {
            this.db = this.client.db('dashboard');
            return this.db.collection(collectionName);
        }
    }
}
exports.dbConnection = new MongoDBConnection();
//# sourceMappingURL=config.js.map