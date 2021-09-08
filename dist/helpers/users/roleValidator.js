"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminRole = void 0;
const isAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: "should verify error without valid toke firsth ",
        });
    }
    const { role, name } = req.user;
    console.log(role);
    if (role !== "ADMIN_ROLE" && role !== "SELLER_ROLE") {
        return res.status(401).json({ msg: `${name} is not admin` });
    }
    next();
};
exports.isAdminRole = isAdminRole;
//# sourceMappingURL=roleValidator.js.map