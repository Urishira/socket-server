"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldValidator = void 0;
const express_validator_1 = require("express-validator");
const fieldValidator = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors);
    next();
};
exports.fieldValidator = fieldValidator;
//# sourceMappingURL=fieldValidator.js.map