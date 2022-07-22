"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const ErrorHandler_1 = require("../Classes/ErrorHandler");
function Public(blockAuthUsers = false) {
    return (target, propertyKey, descriptor) => {
        const original = descriptor.value;
        descriptor.value = function (...args) {
            const request = args[0];
            if (request === null || request === void 0 ? void 0 : request.noToken)
                return original.apply(this, args);
            blockAuthUsers &&
                ErrorHandler_1.default.Unauthorized("User not authorized to access this resource - Public Decorator", "Ocorreu um erro ao verificar seu token de acesso. Faça logout ou tente novamente.", request.res);
            return original.apply(this, args);
        };
    };
}
exports.Public = Public;
