"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioServer = void 0;
var socket_io_1 = require("socket.io");
var auth_1 = __importDefault(require("../middlewares/auth"));
var bot_1 = require("../models/bot");
var messages_1 = require("../models/schemas/messages");
var logs_1 = require("./logs");
var server_1 = require("./server");
// Socket Server
var ioServer = function (server) {
    var io = new socket_io_1.Server(server);
    // Middleware Wrapper
    var wrap = function (middleware) { return function (socket, next) {
        return middleware(socket.request, {}, next);
    }; };
    // Middlewares to pass user information and the current session details to socket.request
    io.use(wrap(server_1.sessionMiddleware));
    io.use(wrap(auth_1.default.initialize()));
    io.use(wrap(auth_1.default.session()));
    // Check if a user exist (logged) if not return Error
    io.use(function (socket, next) {
        if (socket.request.user) {
            next();
        }
        else {
            next(new Error('unauthorized'));
        }
    });
    io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    logs_1.logger.info('Client Authorized and Connected');
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    socket.on('sendMessage', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                        var newUserMessage, botResponse, _a, error_2, _b, _c, _d;
                        var _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _f.trys.push([0, 4, , 5]);
                                    newUserMessage = new messages_1.messages({
                                        // @ts-ignore
                                        userId: socket.request.user._id,
                                        // @ts-ignore
                                        type: socket.request.user.name,
                                        message: message,
                                    });
                                    return [4 /*yield*/, newUserMessage.save()];
                                case 1:
                                    _f.sent();
                                    _a = messages_1.messages.bind;
                                    _e = {
                                        // @ts-ignore
                                        userId: socket.request.user._id,
                                        type: '🤖 HekiBOT 🤖'
                                    };
                                    return [4 /*yield*/, bot_1.botModel.getResponse(message, 
                                        // @ts-ignore
                                        socket.request.user._id)];
                                case 2:
                                    botResponse = new (_a.apply(messages_1.messages, [void 0, (_e.message = _f.sent(),
                                            _e)]))();
                                    return [4 /*yield*/, botResponse.save()];
                                case 3:
                                    _f.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_2 = _f.sent();
                                    logs_1.logger.error(error_2);
                                    return [3 /*break*/, 5];
                                case 5:
                                    _c = (_b = io).emit;
                                    _d = ['messages'];
                                    // @ts-ignore
                                    return [4 /*yield*/, messages_1.messages.find({ userId: socket.request.user._id })];
                                case 6:
                                    _c.apply(_b, _d.concat([
                                        // @ts-ignore
                                        _f.sent()]));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    _b = (_a = socket).emit;
                    _c = ['messages'];
                    // @ts-ignore
                    return [4 /*yield*/, messages_1.messages.find({ userId: socket.request.user._id })];
                case 2:
                    _b.apply(_a, _c.concat([
                        // @ts-ignore
                        _d.sent()]));
                    socket.on('delete', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    logs_1.logger.info('Messages Deleted');
                                    // @ts-ignore
                                    return [4 /*yield*/, messages_1.messages.deleteMany({ userId: socket.request.user._id })];
                                case 1:
                                    // @ts-ignore
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _d.sent();
                    logs_1.logger.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    return io;
};
exports.ioServer = ioServer;
