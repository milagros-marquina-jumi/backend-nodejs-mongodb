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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../database/config");
class UserController {
    constructor() { }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = req.query;
            const collection = config_1.dbConnection.getCollection('users');
            const userByName = yield collection.findOne({ name });
            if (userByName) {
                res.json({ userByName });
            }
            const userByEmail = yield collection.findOne({ email });
            if (userByEmail) {
                res.json({ userByEmail });
            }
            res.status(401).json({ msg: 'usuario no existe DB' });
        });
    }
    ;
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, page = 1, limit = 10, sortField = 'name', sortOrder = 'asc' } = req.query;
            const filter = {};
            if (name)
                filter['name'] = { $regex: name.toString(), $options: 'i' };
            if (email)
                filter['email'] = { $regex: email.toString(), $options: 'i' };
            const options = {
                limit: parseInt(limit),
                skip: (parseInt(page) - 1) * parseInt(limit),
                sort: { [`${sortField}`]: sortOrder === 'asc' ? 1 : -1 }
            };
            const collection = config_1.dbConnection.getCollection('users');
            const users = yield collection.find(filter, options).toArray();
            res.json({ users });
        });
    }
    ;
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, rol } = req.body;
            const newUser = { name, email, password, rol, state: true };
            const salt = bcryptjs_1.default.genSaltSync();
            newUser.password = bcryptjs_1.default.hashSync(password, salt);
            const collection = config_1.dbConnection.getCollection('users');
            yield collection.insertOne(newUser);
            res.status(200).json({
                newUser
            });
        });
    }
    ;
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _a = req.body, { _id, password, google, email } = _a, resUser = __rest(_a, ["_id", "password", "google", "email"]);
            if (password) {
                const salt = bcryptjs_1.default.genSaltSync();
                resUser.password = bcryptjs_1.default.hashSync(password, salt);
            }
            const collection = config_1.dbConnection.getCollection('users');
            yield collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: resUser });
            res.status(200).json({
                msg: "el usuario fue actualizado",
            });
        });
    }
    ;
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const collection = config_1.dbConnection.getCollection('users');
            yield collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { state: false } });
            res.status(200).json({
                msg: "el usuario fue eliminado",
            });
        });
    }
    ;
}
exports.default = UserController;
//# sourceMappingURL=user.js.map