"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce Project',
            version: '0.0.1',
            description: 'Ecommerce API Application',
            contact: {
                name: 'Josue',
                email: 'joxpulp@gmail.com',
            },
        },
        servers: [
            {
                url: 'https://hekitech.herokuapp.com/api',
                description: 'Backend',
            },
        ],
    },
    apis: ['src/routes/*'],
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
