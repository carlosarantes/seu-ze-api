"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthMiddleware {
    static validate(req, res, next) {
        return next();
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map