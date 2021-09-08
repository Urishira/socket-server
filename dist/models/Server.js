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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const Sockets_1 = require("../sockets/Sockets");
const path_1 = __importDefault(require("path"));
const RoutesPath_1 = require("../routes/path/RoutesPath");
const config_1 = require("../database/config");
dotenv_1.default.config();
class Server {
    constructor() {
        this.PORT = process.env.PORT || 8000;
        this.app = express_1.default();
        this.databaseConect();
        this.server = new http_1.default.Server(this.app);
        this.socket = new Sockets_1.Sockets(this.server);
        this.paths = new RoutesPath_1.RoutesPath(this.app);
        this.middleware();
    }
    middleware() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../dist/public")));
        this.app.use(express_1.default.json());
    }
    databaseConect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.connectDataBase();
        });
    }
    listen() {
        this.server.listen(this.PORT, () => {
            console.log(`The server is running on Port ${this.PORT}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map