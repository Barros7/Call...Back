"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockPostgre = void 0;
const Database_1 = require("../config/db/Database");
class ClockPostgreRepository {
    async create(data) {
        return await Database_1.default.clock.create({
            data: Object.assign({}, data),
        });
    }
    async findAll(user_id) {
        return await Database_1.default.clock.findMany({
            where: {
                user_id: user_id,
            },
        });
    }
}
exports.ClockPostgre = new ClockPostgreRepository();
