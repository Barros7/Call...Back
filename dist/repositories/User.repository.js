"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostgre = void 0;
const client_1 = require("@prisma/client");
const Database_1 = require("../config/db/Database");
const bcrypt = require("bcrypt");
const HASH_POWER = 14;
class UserPostgreRepository {
    async create(data) {
        return await Database_1.default.user.create({
            data: Object.assign(Object.assign({}, data), { password: await bcrypt.hash(data.password, HASH_POWER) }),
        });
    }
    async update(id, data) {
        return await Database_1.default.user.update({
            where: {
                id: id,
            },
            data: Object.assign(Object.assign(Object.assign({}, data), (data.password && {
                password: await bcrypt.hash(data.password, HASH_POWER),
            })), (data.deleted && {
                deleted: data.deleted === "true",
            })),
        });
    }
    async findOne(data) {
        return await Database_1.default.user.findFirst({
            where: Object.assign(Object.assign({}, data), { deleted: false }),
            include: {
                images: true,
            },
        });
    }
    async findAll() {
        return await Database_1.default.user.findMany({
            where: {
                deleted: false,
                role: client_1.Role.Funcionario,
            },
            include: {
                images: true,
            },
        });
    }
    async delete(id) {
        return await Database_1.default.user.update({
            where: {
                id: id,
            },
            data: {
                deleted: true,
            },
        });
    }
}
exports.UserPostgre = new UserPostgreRepository();
