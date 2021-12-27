"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRoutes = void 0;
const login_1 = require("../controller/login");
const express_validator_1 = require("express-validator");
const fieldValidator_1 = require("../../middlewares/fieldValidator");
class LoginRoutes {
    routes(app) {
        app
            .route("/login")
            .post([
            (0, express_validator_1.check)("email", "you must send an email").isEmail(),
            (0, express_validator_1.check)("password", "you need to send a password").not().isEmpty(),
            fieldValidator_1.fieldValidator,
        ], login_1.login);
        app.route("/renew").get();
    }
}
exports.LoginRoutes = LoginRoutes;
//# sourceMappingURL=LoginRoutes.js.map