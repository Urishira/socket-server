"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "the name is required"],
        unique: true,
    },
    state: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String,
    },
});
exports.default = mongoose_1.model("InterfaceProduct", ProductSchema);
//# sourceMappingURL=Product.js.map