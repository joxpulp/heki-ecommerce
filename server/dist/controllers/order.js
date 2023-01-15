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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
var config_1 = require("../config/config");
var cart_1 = require("../models/cart");
var order_1 = require("../models/order");
var email_1 = require("../services/email");
var OrderController = /** @class */ (function () {
    function OrderController() {
    }
    OrderController.prototype.getOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orderId, findById, findAll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = req.params.orderId;
                        if (!orderId) return [3 /*break*/, 2];
                        return [4 /*yield*/, order_1.orderModel.get(req.user._id, orderId)];
                    case 1:
                        findById = _a.sent();
                        if (findById.length) {
                            return [2 /*return*/, res.json.apply(res, findById)];
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, order_1.orderModel.get(req.user._id)];
                    case 3:
                        findAll = _a.sent();
                        if (findAll.length) {
                            return [2 /*return*/, res.json(findAll)];
                        }
                        return [2 /*return*/, res.status(404).json({ error: 'No orders for this user' })];
                }
            });
        });
    };
    OrderController.prototype.newOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cart, productTitles, purchase;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cart_1.cartModel.get(req.user._id)];
                    case 1:
                        cart = (_a.sent())[0];
                        productTitles = '';
                        cart.cartProducts.map(function (cart) { return (productTitles += "- " + cart.name + "\n"); });
                        return [4 /*yield*/, order_1.orderModel.newOrder(req.user._id)];
                    case 2:
                        purchase = _a.sent();
                        return [4 /*yield*/, email_1.emailGmail.sendEmail(config_1.CONFIG.GMAIL_EMAIL, "New order notification | " + req.user.name + " | " + req.user.email, productTitles)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json({ msg: purchase })];
                }
            });
        });
    };
    OrderController.prototype.complete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orderId, findById, completeOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = req.body.orderId;
                        return [4 /*yield*/, order_1.orderModel.get(req.user._id, orderId)];
                    case 1:
                        findById = _a.sent();
                        if (!findById.length) return [3 /*break*/, 4];
                        return [4 /*yield*/, order_1.orderModel.complete(req.user._id, orderId)];
                    case 2:
                        completeOrder = _a.sent();
                        return [4 /*yield*/, email_1.emailGmail.sendEmail(config_1.CONFIG.GMAIL_EMAIL, "Order notification | " + req.user.name + " | " + req.user.email, 'The state of your order changed to completed')];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json({ msg: completeOrder })];
                    case 4: return [2 /*return*/, res.status(404).json({ error: 'Order does not exist' })];
                }
            });
        });
    };
    return OrderController;
}());
exports.orderController = new OrderController();
