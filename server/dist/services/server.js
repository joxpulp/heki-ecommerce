"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
var express_1 = __importDefault(require("express"));
var http = __importStar(require("http"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var heroku_ssl_redirect_1 = __importDefault(require("heroku-ssl-redirect"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var mongoose_1 = require("./mongoose");
var config_1 = require("../config/config");
var index_1 = __importDefault(require("../routes/index"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_1 = require("../config/swagger");
var path_1 = __importDefault(require("path"));
(0, mongoose_1.mongoose)();
var app = (0, express_1.default)();
exports.sessionMiddleware = (0, express_session_1.default)({
    store: connect_mongo_1.default.create({ mongoUrl: config_1.CONFIG.MONGO_URL }),
    secret: config_1.CONFIG.SECRET,
    cookie: { sameSite: false, secure: 'auto', maxAge: config_1.CONFIG.COOKIE_TIMEOUT * 60 * 1000 },
    saveUninitialized: false,
    resave: true,
    rolling: true,
});
app.use(express_1.default.static(path_1.default.resolve('public')));
app.set('json spaces', 2);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// File upload middleware with temp dir
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));
app.use((0, heroku_ssl_redirect_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
}));
app.use(exports.sessionMiddleware);
app.use(auth_1.default.initialize());
app.use(auth_1.default.session());
// API DOCS
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs, {
    customSiteTitle: 'Backend Coderhouse Final Project',
}));
app.use('/api', index_1.default);
app.get('/*', function (req, res) {
    var indexHtml = path_1.default.resolve('public/index.html');
    res.sendFile(indexHtml);
});
var server = new http.Server(app);
exports.default = server;
