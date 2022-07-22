"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clock_repository_1 = require("../repositories/Clock.repository");
const Image_repository_1 = require("../repositories/Image.repository");
const User_repository_1 = require("../repositories/User.repository");
class UserService {
    async create(req, res) {
        const body = req.body;
        const user = await User_repository_1.UserPostgre.create(body);
        return user;
    }
    async findAll(req, res) {
        const users = await User_repository_1.UserPostgre.findAll();
        return users;
    }
    async getOne(req, res) {
        const { id } = req.params;
        const user = req.user;
        const users = await User_repository_1.UserPostgre.findOne({ id: id ? Number(id) : user.id });
        return users;
    }
    async update(req, res, fileType) {
        var _a;
        const { id } = req.params;
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) {
            await Image_repository_1.ImagePostgre.create({
                type: fileType,
                path: req.file.filename,
                user_id: Number(id),
            });
        }
        const userUpdated = await User_repository_1.UserPostgre.update(Number(id), req.body);
        return userUpdated;
    }
    async getClocks(req, res) {
        const { id } = req.params;
        const user = req.user;
        const clocks = await Clock_repository_1.ClockPostgre.findAll(id ? Number(id) : user.id);
        return clocks;
    }
    async delete(req, res) {
        const { id } = req.params;
        const user = await User_repository_1.UserPostgre.delete(Number(id));
        return user;
    }
    async logout(req, res) {
        res.clearCookie("authorization");
        return true;
    }
}
exports.default = new UserService();
