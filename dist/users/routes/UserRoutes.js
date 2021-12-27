"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const userController_1 = require("../controllers/userController");
const express_validator_1 = require("express-validator");
const databaseValidator_1 = require("../middleware/databaseValidator");
const fieldValidator_1 = require("../../middlewares/fieldValidator");
const jwtValidator_1 = require("../../helpers/token/jwtValidator");
class UserRoutes {
    routes(app) {
        app
            .route("/users")
            .get(userController_1.userGet)
            .post([
            (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
            (0, express_validator_1.check)("email", "this is not an email valid").isEmail(),
            (0, express_validator_1.check)("email").custom(databaseValidator_1.emailValidator),
            (0, express_validator_1.check)("password", "password must be equal to 8 or greater 8 characters").isLength({ min: 8 }),
            fieldValidator_1.fieldValidator,
        ], userController_1.userPost);
        app
            .route("/users/:id")
            .put([
            (0, express_validator_1.check)("id", "id is required").not().isEmpty(),
            (0, express_validator_1.check)("id").custom(databaseValidator_1.idValidator),
            (0, express_validator_1.check)("id", "id i not mongo id").isMongoId(),
            fieldValidator_1.fieldValidator,
        ], userController_1.userPut)
            .delete(jwtValidator_1.jwtValidator, [
            (0, express_validator_1.check)("id", "id is required").not().isEmpty(),
            (0, express_validator_1.check)("id", "id i not mongo id").isMongoId(),
            (0, express_validator_1.check)("id").custom(databaseValidator_1.idValidator),
            fieldValidator_1.fieldValidator,
        ], userController_1.userDelete);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=UserRoutes.js.map