"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.CONFIG = {
    PORT: process.env.PORT || 8080,
    PID: process.pid || 'PID',
    MONGO_URL: process.env.MONGO_URL || 'MONGO_URL',
    SECRET: process.env.SECRET || 'SECRET',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'CLOUDINARY_CLOUD_NAME',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || 'CLOUDINARY_API_KEY',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'CLOUDINARY_API_SECRET',
    GMAIL_NAME: process.env.GMAIL_NAME || 'NAME',
    GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'EMAIL',
    GMAIL_PWD: process.env.GMAIL_PWD || 'NAME',
    COOKIE_TIMEOUT: Number(process.env.COOKIE_TIMEOUT) || 2
};
