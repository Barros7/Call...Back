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
const client_1 = require("@prisma/client");
const User_service_1 = require("../services/User.service");
const Public_decorator_1 = require("../utils/decorators/Public.decorator");
const Roles_decorator_1 = require("../utils/decorators/Roles.decorator");
const Route_decorator_1 = require("../utils/decorators/Route.decorator");
const methods_enum_1 = require("../utils/enums/methods.enum");
const Roles_enum_1 = require("../utils/enums/Roles.enum");
const uploadFile_1 = require("../utils/uploadFile");
class UserController {
    async post(req, res) {
        return await User_service_1.default.create(req, res);
    }
    async getClocks(req, res) {
        return await User_service_1.default.getClocks(req, res);
    }
    async getAll(req, res) {
        return await User_service_1.default.findAll(req, res);
    }
    async getOne(req, res) {
        return await User_service_1.default.getOne(req, res);
    }
    async updateProfile(req, res) {
        return await User_service_1.default.update(req, res, client_1.ImageType.Perfil);
    }
    async updateDocument(req, res) {
        return await User_service_1.default.update(req, res, client_1.ImageType.Documento);
    }
    async update(req, res) {
        return await User_service_1.default.update(req, res);
    }
}
__decorate([
    (0, Public_decorator_1.Public)(),
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.POST,
        path: "/user",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "post", null);
__decorate([
    (0, Roles_decorator_1.Roles)(Roles_enum_1.Role.Funcionario, Roles_enum_1.Role.Administrador),
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.GET,
        path: "/user/clocks/:id?",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getClocks", null);
__decorate([
    (0, Roles_decorator_1.Roles)(Roles_enum_1.Role.Administrador),
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.GET,
        path: "/users",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, Roles_decorator_1.Roles)(Roles_enum_1.Role.Administrador, Roles_enum_1.Role.Funcionario),
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.GET,
        path: "/user/:id?",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOne", null);
__decorate([
    (0, Roles_decorator_1.Roles)(Roles_enum_1.Role.Administrador),
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.PUT,
        path: "/user/:id/profile",
        middleware: uploadFile_1.default.single("image"),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, Roles_decorator_1.Roles)(Roles_enum_1.Role.Administrador),
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.PUT,
        path: "/user/:id/document",
        middleware: uploadFile_1.default.single("image"),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateDocument", null);
__decorate([
    (0, Roles_decorator_1.Roles)(Roles_enum_1.Role.Administrador),
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.PUT,
        path: "/user/:id",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
exports.default = UserController;
