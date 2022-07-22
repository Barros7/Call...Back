"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const ErrorHandler_1 = require("../Classes/ErrorHandler");
function Roles(...roles) {
    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args) {
            const request = args[0];
            const { role: userRole } = request.user;
            if (userRole.length === 0 || !roles.includes(userRole))
                return ErrorHandler_1.default.Unauthorized("User not authorized to access this resource - Roles Decorator", "Você não tem permissão suficiente para acessar este recurso.", request.res);
            return original.apply(this, args);
        };
    };
}
exports.Roles = Roles;
