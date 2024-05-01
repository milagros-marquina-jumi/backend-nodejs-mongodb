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
exports.searchUserById = exports.existingEmail = exports.roleValidation = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../database/config");
const roleValidation = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = config_1.dbConnection.getCollection('roles');
    const rolDb = yield collection.findOne({ rol });
    if (!rolDb) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.roleValidation = roleValidation;
const existingEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = config_1.dbConnection.getCollection('users');
    const emailDb = yield collection.findOne({ email });
    if (emailDb) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
});
exports.existingEmail = existingEmail;
const searchUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = config_1.dbConnection.getCollection('users');
    const userDb = yield collection.findOne({ _id: new mongodb_1.ObjectId(id) });
    if (!userDb) {
        throw new Error(`El id no existe ${id}`);
    }
});
exports.searchUserById = searchUserById;
//# sourceMappingURL=db-validators.js.map