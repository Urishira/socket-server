"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: [true, "name is required"],
    },
    email: {
        type: String,
        require: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "password is required"],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: "USER_ROLE",
        emun: ["ADMIN_ROLE", "USER_ROLE"],
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});
exports.default = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=user.js.map