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
exports.reValidToken = exports.login = void 0;
const Users_1 = __importDefault(require("../../models/Users"));
const jwtGenerator_1 = require("../../helpers/token/jwtGenerator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //verify email  if exist
        const user = (yield Users_1.default.findOne({ email }));
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "User / Password are not correct",
            });
        }
        // user is active
        if (!user.state) {
            return res.status(400).json({
                ok: false,
                msg: "User / Password are not correct state:false",
            });
        }
        // verify password
        const validPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password is not correct",
            });
        }
        const token = yield jwtGenerator_1.jwtGenerator(user.id);
        res.json({
            ok: true,
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "something out bad",
        });
    }
});
exports.login = login;
const reValidToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const token = yield jwtGenerator_1.jwtGenerator(id);
    res.json({
        ok: true,
        token,
    });
});
exports.reValidToken = reValidToken;
//# sourceMappingURL=login.js.map