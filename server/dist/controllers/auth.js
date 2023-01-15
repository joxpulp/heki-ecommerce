"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.authController = void 0;
var auth_1 = __importStar(require("../middlewares/auth"));
var cloudinary_1 = __importDefault(require("../services/cloudinary"));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.login = function (req, res, next) {
        auth_1.default.authenticate('login', function (err, user, info) {
            if (err)
                return next(err);
            if (user) {
                req.login(user, function () {
                    return res.json({
                        userData: {
                            _id: user._id,
                            name: user.name,
                            lastname: user.lastname,
                            age: user.age,
                            deliveryAddress: user.deliveryAddress,
                            phone: user.phone,
                            avatar: user.avatar,
                            admin: user.admin,
                        },
                        loggedIn: true,
                    });
                });
            }
            else {
                return res.status(401).json(__assign(__assign({}, info), { loggedIn: false }));
            }
        })(req, res, next);
    };
    AuthController.prototype.signup = function (req, res, next) {
        auth_1.default.authenticate('signup', function (err, user, info) {
            if (err)
                return next(err);
            if (user) {
                return res.status(201).json({
                    userData: {
                        _id: user._id,
                        name: user.name,
                        lastname: user.lastname,
                        age: user.age,
                        deliveryAddress: user.deliveryAddress,
                        phone: user.phone,
                        avatar: user.avatar,
                        admin: user.admin,
                    },
                    msg: 'User created',
                });
            }
            else {
                return res.status(401).json(__assign({}, info));
            }
        })(req, res, next);
    };
    AuthController.prototype.isLoggedIn = function (req, res) {
        if (req.user) {
            return res.json({ loggedIn: true });
        }
        else {
            return res.status(404).json({ loggedIn: false });
        }
    };
    AuthController.prototype.logout = function (req, res) {
        if (req.user) {
            req.logout();
            return res.json({ msg: 'Session ended', loggedIn: false });
        }
        return res
            .status(404)
            .json({ error: 'The is no session started or is already logout' });
    };
    AuthController.prototype.editUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, tempFilePath, _a, secure_url, public_id, userUpdated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = __assign({}, req.body);
                        if (!req.files) return [3 /*break*/, 3];
                        tempFilePath = req.files.avatar.tempFilePath;
                        return [4 /*yield*/, cloudinary_1.default.uploader.destroy(req.user.avatar_id)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, cloudinary_1.default.uploader.upload(tempFilePath, { folder: 'AVATARS' })];
                    case 2:
                        _a = _b.sent(), secure_url = _a.secure_url, public_id = _a.public_id;
                        data.avatar = secure_url;
                        data.avatar_id = public_id;
                        _b.label = 3;
                    case 3: return [4 /*yield*/, (0, auth_1.editUser)(req.user._id, data)];
                    case 4:
                        userUpdated = _b.sent();
                        return [2 /*return*/, res.status(201).json({ userUpdated: userUpdated, msg: 'User Updated' })];
                }
            });
        });
    };
    return AuthController;
}());
exports.authController = new AuthController();
