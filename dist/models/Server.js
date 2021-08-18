"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const Sockets_1 = require("../sockets/Sockets");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.apiPath = {
            user: "/api/user",
            auth: "/api/auth",
            product: "/api/product",
            categories: "/api/categories",
            search: "/api/search",
            uploadFile: "/api/upload",
        };
        this.PORT = process.env.PORT || 8000;
        this.app = express_1.default();
        this.server = new http_1.default.Server(this.app);
        this.socket = new Sockets_1.Sockets(this.server);
        this.apiPath;
        this.routes();
        this.middleware();
    }
    routes() {
        this.app.use(this.apiPath.user, userRoutes_1.default);
    }
    middleware() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../client")));
        this.app.use(express_1.default.json());
    }
    listen() {
        this.server.listen(this.PORT, () => {
            console.log(`The server is running on Port ${this.PORT}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map