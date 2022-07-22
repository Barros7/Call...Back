"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
exports.default = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/uploads");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname);
        },
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/webp",
            "application/pdf",
        ].find((formatoAceite) => formatoAceite == file.mimetype);
        if (extensaoImg) {
            return cb(null, true);
        }
        return cb(null, false);
    },
});
