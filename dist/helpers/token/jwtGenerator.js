"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtGenerator = exports.keyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.keyJWT = process.env.SECRETPRIVATEKEY;
const jwtGenerator = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, exports.keyJWT, {
            expiresIn: "2h",
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(`error with token ${err}`);
            }
            resolve(token);
        });
    });
};
exports.jwtGenerator = jwtGenerator;
//# sourceMappingURL=jwtGenerator.js.map