"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt = require("jsonwebtoken");
require("dotenv/config");
const AuthMiddleware = (req, res, next) => {
    const token = req.cookies.authorization;
    if (!token) {
        req.noToken = true;
        return next();
    }
    return jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err)
            return res.status(401).json({
                message: "Token inválido",
            });
        req.user = decoded;
        next();
    });
};
exports.AuthMiddleware = AuthMiddleware;
