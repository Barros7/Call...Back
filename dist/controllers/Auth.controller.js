"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_service_1 = require("../services/Auth.service");
const Public_decorator_1 = require("../utils/decorators/Public.decorator");
const Roles_decorator_1 = require("../utils/decorators/Roles.decorator");
const Route_decorator_1 = require("../utils/decorators/Route.decorator");
const methods_enum_1 = require("../utils/enums/methods.enum");
const Roles_enum_1 = require("../utils/enums/Roles.enum");
class AuthController {
    async post(req, res, next) {
        return await Auth_service_1.default.login(req, res);
    }
    async delete(req, res) {
        return await Auth_service_1.default.logout(req, res);
    }
}
__decorate([
    (0, Public_decorator_1.Public)(),
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.POST,
        path: "/auth",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "post", null);
__decorate([
    (0, Roles_decorator_1.Roles)(Roles_enum_1.Role.Funcionario, Roles_enum_1.Role.Administrador),
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.DELETE,
        path: "/auth",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "delete", null);
exports.default = AuthController;
