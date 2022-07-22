"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagePostgre = void 0;
const Database_1 = require("../config/db/Database");
class ImagePostgreRepository {
    async create(data) {
        const existImage = await Database_1.default.image.findFirst({
            where: {
                type: data.type,
                user_id: data.user_id,
            },
        });
        if (existImage) {
            await Database_1.default.image.delete({
                where: {
                    id: existImage.id,
                },
            });
        }
        return await Database_1.default.image.create({
            data: Object.assign({}, data),
        });
    }
}
exports.ImagePostgre = new ImagePostgreRepository();
