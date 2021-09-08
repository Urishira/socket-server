"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesPath = void 0;
const UserRoutes_1 = __importDefault(require("../UserRoutes"));
class RoutesPath {
    constructor(app) {
        this.app = app;
        this.path = {
            user: "/api/users",
            auth: "/api/auth",
            product: "/api/product",
            search: "/api/search",
            uploadFile: "/api/upload",
        };
        this.routes();
    }
    routes() {
        this.app.use(this.path.user, UserRoutes_1.default);
    }
}
exports.RoutesPath = RoutesPath;
//# sourceMappingURL=RoutesPath.js.map