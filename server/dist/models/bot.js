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
exports.botModel = void 0;
var cartschema_1 = require("./schemas/cartschema");
var productschema_1 = require("./schemas/productschema");
var orderschema_1 = require("./schemas/orderschema");
var Bot = /** @class */ (function () {
    function Bot() {
    }
    Bot.prototype.getResponse = function (message, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, productStock, response_1, lastOrder, response_2, currentCart, response_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = message.toLowerCase();
                        switch (_a) {
                            case 'stock': return [3 /*break*/, 1];
                            case 'order': return [3 /*break*/, 3];
                            case 'cart': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, productschema_1.products.find({}, { name: 1, stock: 1 })];
                    case 2:
                        productStock = _b.sent();
                        response_1 = '';
                        productStock.map(function (product) {
                            response_1 += "- " + product.name + ": " + product.stock + " \n";
                        });
                        return [2 /*return*/, response_1];
                    case 3: return [4 /*yield*/, orderschema_1.order.findOne({ userId: userId }, {}, { sort: { createdAt: -1 } })];
                    case 4:
                        lastOrder = _b.sent();
                        response_2 = '';
                        if (lastOrder === null) {
                            response_2 = 'No orders generated';
                        }
                        else {
                            response_2 = "Last order with id: " + lastOrder._id + " \nCurrent state: " + (lastOrder.state === 'generated' ? lastOrder.state : lastOrder.state) + " and " + (lastOrder.state === 'generated' ? 'will be delivered soon' : 'delivered') + "\nWith this products: \n";
                            lastOrder.purchases.map(function (product) {
                                response_2 += "- " + product.name + ", Price: " + product.price + " USD, Qty: " + product.quantity + "\n";
                            });
                            response_2 += "Total: " + lastOrder.total + " USD";
                        }
                        return [2 /*return*/, response_2];
                    case 5: return [4 /*yield*/, cartschema_1.cart.findOne({ userId: userId })];
                    case 6:
                        currentCart = _b.sent();
                        response_3 = '';
                        if (currentCart === null) {
                            response_3 = 'Your cart is empty';
                        }
                        else {
                            response_3 = 'Your cart has these products:\n';
                            currentCart.cartProducts.map(function (product) {
                                response_3 += "- " + product.name + ", Price: " + product.price + ", Quantity: " + product.quantity + "\n";
                            });
                            response_3 += "Total: " + currentCart.total + " USD";
                        }
                        return [2 /*return*/, response_3];
                    case 7: return [2 /*return*/, "Hi! I just couldn't understand your message.\nPlease type some of the following options:\n- Stock: To know our current stock.\n- Order: To get info of your last order.\n- Cart: To know info about your current cart.\n                "];
                }
            });
        });
    };
    return Bot;
}());
exports.botModel = new Bot();
