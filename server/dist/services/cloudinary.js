"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cloudinary_1 = require("cloudinary");
var config_1 = require("../config/config");
cloudinary_1.v2.config({
    cloud_name: config_1.CONFIG.CLOUDINARY_CLOUD_NAME,
    api_key: config_1.CONFIG.CLOUDINARY_API_KEY,
    api_secret: config_1.CONFIG.CLOUDINARY_API_SECRET,
});
exports.default = cloudinary_1.v2;
