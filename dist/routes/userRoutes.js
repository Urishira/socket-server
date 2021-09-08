"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const userController_1 = require("../users/controllers/userController");
const express_validator_1 = require("express-validator");
const databaseValidator_1 = require("../users/middleware/databaseValidator");
const fieldValidator_1 = require("../middlewares/fieldValidator");
class UserRoutes {
    routes(app) {
        app.route("/").get((req, res) => {
            res.status(200).send({ message: "Get request successfully" });
        });
        app
            .route("/users")
            .get(userController_1.userGet)
            .post([
            express_validator_1.check("name", "Name is required").not().isEmpty(),
            express_validator_1.check("email", "this is not an email valid").isEmail(),
            express_validator_1.check("email").custom(databaseValidator_1.emailValidator),
            express_validator_1.check("password", "password must be equal to 8 or greater 8 characters").isLength({ min: 8 }),
            fieldValidator_1.fieldValidator,
        ], userController_1.userPost);
        app
            .route("/users/:id")
            .put([
            express_validator_1.check("id", "id is required").not().isEmpty(),
            express_validator_1.check("id").custom(databaseValidator_1.idValidator),
            express_validator_1.check("id", "id i not mongo id").isMongoId(),
            fieldValidator_1.fieldValidator,
        ], userController_1.userPut)
            .delete([
            express_validator_1.check("id", "id is required").not().isEmpty(),
            express_validator_1.check("id", "id i not mongo id").isMongoId(),
            express_validator_1.check("id").custom(databaseValidator_1.idValidator),
            fieldValidator_1.fieldValidator,
        ], userController_1.userDelete);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=UserRoutes.js.map