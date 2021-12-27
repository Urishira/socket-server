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
exports.userDelete = exports.userPut = exports.userPost = exports.userGet = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = __importDefault(require("../../models/Users"));
const createUserInDB_1 = require("../../helpers/users/createUserInDB");
const userGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };
    const [count, users] = yield Promise.all([
        yield Users_1.default.countDocuments(query),
        yield Users_1.default.find(query).skip(Number(from)).limit(Number(limit)),
    ]);
    res.json({
        count,
        users,
        ok: true,
    });
});
exports.userGet = userGet;
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = yield (0, createUserInDB_1.createUserInDB)({ name, email, password });
        return res.status(201).json({
            msg: "User created",
            user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.userPost = userPost;
const userPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, google, password } = _a, rest = __rest(_a, ["_id", "google", "password"]);
    if (password) {
        const salt = bcrypt_1.default.genSaltSync();
        rest.password = bcrypt_1.default.hashSync(password, salt);
    }
    const user = yield Users_1.default.findByIdAndUpdate(id, rest);
    res.status(200).json({
        msg: "put API",
        user,
        ok: true,
    });
});
exports.userPut = userPut;
const userDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { state } = (yield Users_1.default.findById(id));
    if (!state) {
        return res.status(401).json({
            msg: "user is not valid",
        });
    }
    const user = yield Users_1.default.findByIdAndUpdate(id, { state: false });
    user === null || user === void 0 ? void 0 : user.save();
    res.json({
        msg: "user deleted",
    });
});
exports.userDelete = userDelete;
//# sourceMappingURL=userController.js.map