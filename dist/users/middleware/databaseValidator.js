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
exports.idValidator = exports.emailValidator = exports.roleValidator = void 0;
const Users_1 = __importDefault(require("../../models/Users"));
const Role_1 = __importDefault(require("../../role/model/Role"));
const roleValidator = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const roleExists = yield Role_1.default.findOne({ role });
    if (!roleExists)
        throw new Error(`role ${role} is not registered in DB`);
});
exports.roleValidator = roleValidator;
const emailValidator = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailAlreadyExist = yield Users_1.default.findOne({ email });
    if (emailAlreadyExist)
        throw new Error(`email ${email} already exists`);
});
exports.emailValidator = emailValidator;
const idValidator = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isId = yield Users_1.default.findOne({ _id: id });
    console.log(isId);
    if (!isId)
        throw new Error(`user by ${id} not exists`);
});
exports.idValidator = idValidator;
//# sourceMappingURL=databaseValidator.js.map