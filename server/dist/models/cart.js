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
exports.cartModel = void 0;
var product_1 = require("./product");
var cartschema_1 = require("./schemas/cartschema");
var productschema_1 = require("./schemas/productschema");
var Cart = /** @class */ (function () {
    function Cart() {
    }
    Cart.prototype.get = function (userId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var outputGet, findById, findAll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputGet = [];
                        if (!productId) return [3 /*break*/, 2];
                        return [4 /*yield*/, cartschema_1.cart.findOne({ userId: userId }, { cartProducts: { $elemMatch: { _id: productId } } })];
                    case 1:
                        findById = _a.sent();
                        if (findById)
                            outputGet.push.apply(outputGet, findById.cartProducts);
                        return [2 /*return*/, outputGet];
                    case 2: return [4 /*yield*/, cartschema_1.cart.findOne({ userId: userId })];
                    case 3:
                        findAll = _a.sent();
                        if (findAll)
                            outputGet.push(findAll);
                        _a.label = 4;
                    case 4: return [2 /*return*/, outputGet];
                }
            });
        });
    };
    Cart.prototype.add = function (userId, address, productId, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var findProduct, findProductPlain, findProductCart, ouputNew;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_1.productModel.get(productId)];
                    case 1:
                        findProduct = (_a.sent())[0];
                        findProductPlain = findProduct.toObject();
                        return [4 /*yield*/, this.get(userId, productId)];
                    case 2:
                        findProductCart = _a.sent();
                        ouputNew = findProductPlain;
                        ouputNew.quantity = quantity;
                        ouputNew.price = findProduct.price * quantity;
                        if (!(findProductCart.length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, cartschema_1.cart.updateOne({ userId: userId }, {
                                $inc: {
                                    totalItems: quantity,
                                    total: ouputNew.price,
                                },
                                $set: { deliveryAddress: address },
                                $addToSet: {
                                    cartProducts: ouputNew,
                                },
                            }, { upsert: true })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, cartschema_1.cart.updateOne({ userId: userId, 'cartProducts._id': findProduct._id }, {
                            $inc: {
                                totalItems: quantity,
                                total: ouputNew.price,
                                'cartProducts.$.quantity': quantity,
                                'cartProducts.$.price': ouputNew.price,
                            },
                        })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: 
                    //* Updates the stock to added product in cart
                    return [4 /*yield*/, productschema_1.products.updateOne({ _id: productId }, {
                            $inc: { stock: -quantity },
                        })];
                    case 7:
                        //* Updates the stock to added product in cart
                        _a.sent();
                        return [2 /*return*/, ouputNew];
                }
            });
        });
    };
    Cart.prototype.delete = function (userId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var findProduct, findProductCart, outputDelete, findById;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_1.productModel.get(productId)];
                    case 1:
                        findProduct = (_a.sent())[0];
                        return [4 /*yield*/, this.get(userId, productId)];
                    case 2:
                        findProductCart = (_a.sent())[0];
                        outputDelete = [];
                        return [4 /*yield*/, cartschema_1.cart.updateMany({ userId: userId }, {
                                $inc: {
                                    total: -findProductCart.price,
                                    totalItems: -findProductCart.quantity,
                                },
                                $pull: {
                                    cartProducts: { _id: productId },
                                },
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, cartschema_1.cart.findOne({ userId: userId }, 'cartProducts')];
                    case 4:
                        findById = _a.sent();
                        if (!(findById.cartProducts.length === 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, cartschema_1.cart.findOneAndDelete({ userId: userId })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        outputDelete.push(findProductCart);
                        //* Updates the stock to deleted product in cart
                        return [4 /*yield*/, product_1.productModel.update(productId, {
                                stock: findProduct.stock + findProductCart.quantity,
                            })];
                    case 7:
                        //* Updates the stock to deleted product in cart
                        _a.sent();
                        return [2 /*return*/, outputDelete];
                }
            });
        });
    };
    return Cart;
}());
exports.cartModel = new Cart();
