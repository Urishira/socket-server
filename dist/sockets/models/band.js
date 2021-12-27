"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Band = void 0;
const uuid_1 = require("uuid");
class Band {
    constructor(name) {
        this.name = name;
        this.id = (0, uuid_1.v4)();
        this.votes = 0;
    }
}
exports.Band = Band;
//# sourceMappingURL=Band.js.map