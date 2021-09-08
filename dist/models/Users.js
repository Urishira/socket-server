"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
        default: "USER_FREE",
        emun: ["USER_FREE", "USER_PREMIUM"],
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
UserSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id, password, google, state, role } = _a, user = __rest(_a, ["__v", "_id", "password", "google", "state", "role"]);
    user.id = _id;
    return user;
};
exports.default = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=Users.js.map