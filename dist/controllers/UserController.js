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
exports.userDelete = exports.userPost = exports.userPut = exports.userGet = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = __importDefault(require("../models/Users"));
const userGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };
    const [count, users] = yield Promise.all([
        yield Users_1.default.countDocuments(query),
        yield Users_1.default.find(query).skip(Number(from)).limit(Number(limit)),
    ]);
    res.json({
        count,
        users,
    });
});
exports.userGet = userGet;
const userPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, google, password } = _a, rest = __rest(_a, ["_id", "google", "password"]);
    if (password) {
        const salt = bcrypt_1.default.genSaltSync();
        rest.password = bcrypt_1.default.hashSync(password, salt);
    }
    const user = yield Users_1.default.findByIdAndUpdate(id, rest);
    res.status(500).json({
        msg: "put API",
        user,
    });
});
exports.userPut = userPut;
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const isUserInDB = yield Users_1.default.findOne({ email });
    if (!isUserInDB) {
        const createUser = new Users_1.default({ name, email, password, role });
        const salt = bcrypt_1.default.genSaltSync();
        createUser.password = bcrypt_1.default.hashSync(password, salt);
        const user = yield createUser.save();
        return res.status(201).json({
            msg: "User created",
            user,
        });
    }
});
exports.userPost = userPost;
const userDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield Users_1.default.findByIdAndUpdate(id, { state: false });
    user === null || user === void 0 ? void 0 : user.save();
    res.json({
        user,
    });
});
exports.userDelete = userDelete;
//# sourceMappingURL=userController.js.map