"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User_repository_1 = require("../repositories/User.repository");
const Clock_repository_1 = require("../repositories/Clock.repository");
const client_1 = require("@prisma/client");
class AuthService {
    async login(req, res) {
        const body = req.body;
        let bodyToken = {};
        if (body.pin) {
            const user = await User_repository_1.UserPostgre.findOne({ pin: body.pin });
            if (user) {
                bodyToken = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
                await Clock_repository_1.ClockPostgre.create({
                    type: client_1.ClockType.Entrada,
                    time: new Date().toISOString(),
                    user_id: user.id,
                });
            }
            else {
                throw {
                    status: 401,
                    message: "Usuário não encontrado",
                };
            }
        }
        else {
            const user = await User_repository_1.UserPostgre.findOne({ email: body.email });
            if (user) {
                if (await bcrypt.compare(body.password, user.password)) {
                    bodyToken = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                }
                else {
                    throw {
                        status: 401,
                        message: "Senha incorreta",
                    };
                }
            }
        }
        const token = jwt.sign(bodyToken, process.env.JWT_TOKEN, {
            expiresIn: "1h",
            algorithm: "HS256",
        });
        res.cookie("authorization", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        return { token };
    }
    async logout(req, res) {
        const userInReq = req.user;
        await Clock_repository_1.ClockPostgre.create({
            type: client_1.ClockType.Saida,
            time: new Date().toISOString(),
            user_id: userInReq.id,
        });
        res.clearCookie("authorization");
        return true;
    }
}
exports.default = new AuthService();
