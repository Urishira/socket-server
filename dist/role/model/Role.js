"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    role: {
        type: String,
        require: [true, "Role is required"],
    },
});
exports.default = (0, mongoose_1.model)("Role", RoleSchema);
//# sourceMappingURL=Role.js.map