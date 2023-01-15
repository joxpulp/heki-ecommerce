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
exports.productController = void 0;
var cloudinary_1 = __importDefault(require("../services/cloudinary"));
var product_1 = require("../models/product");
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.prototype.getProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findById, findAll, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        id = req.params.id;
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, product_1.productModel.get(id)];
                    case 1:
                        findById = _a.sent();
                        return [2 /*return*/, res.json({ product: findById })];
                    case 2: return [4 /*yield*/, product_1.productModel.get()];
                    case 3:
                        findAll = _a.sent();
                        return [2 /*return*/, res.json({ products: findAll })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error) {
                            res.status(500).json({ error: error_1.message });
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.getProductsCat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var category, findById, findAll, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        category = req.params.category;
                        if (!category) return [3 /*break*/, 2];
                        return [4 /*yield*/, product_1.productModel.getByCategory(category)];
                    case 1:
                        findById = _a.sent();
                        return [2 /*return*/, res.json({ product: findById })];
                    case 2: return [4 /*yield*/, product_1.productModel.get()];
                    case 3:
                        findAll = _a.sent();
                        return [2 /*return*/, res.json({ products: findAll })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        if (error_2 instanceof Error) {
                            res.status(500).json({ error: error_2.message });
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.addProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, tempFilePath, _a, secure_url, public_id, addedProduct, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        data = __assign({}, req.body);
                        if (!req.files) return [3 /*break*/, 2];
                        tempFilePath = req.files.thumbnail.tempFilePath;
                        return [4 /*yield*/, cloudinary_1.default.uploader.upload(tempFilePath, { folder: 'PRODUCTS' })];
                    case 1:
                        _a = _b.sent(), secure_url = _a.secure_url, public_id = _a.public_id;
                        data.thumbnail = secure_url;
                        data.thumbnail_id = public_id;
                        _b.label = 2;
                    case 2: return [4 /*yield*/, product_1.productModel.add(data)];
                    case 3:
                        addedProduct = _b.sent();
                        return [2 /*return*/, res.json({ addedProduct: addedProduct, msg: 'Product Added' })];
                    case 4:
                        error_3 = _b.sent();
                        if (error_3 instanceof Error) {
                            res.status(500).json({ error: error_3.message });
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.updateProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, product, data, tempFilePath, _a, secure_url, public_id, updatedProduct, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        id = req.params.id;
                        return [4 /*yield*/, product_1.productModel.get(id)];
                    case 1:
                        product = (_b.sent())[0];
                        data = __assign({}, req.body);
                        if (!req.files) return [3 /*break*/, 4];
                        return [4 /*yield*/, cloudinary_1.default.uploader.destroy(product.thumbnail_id)];
                    case 2:
                        _b.sent();
                        tempFilePath = req.files.thumbnail.tempFilePath;
                        return [4 /*yield*/, cloudinary_1.default.uploader.upload(tempFilePath, { folder: 'PRODUCTS' })];
                    case 3:
                        _a = _b.sent(), secure_url = _a.secure_url, public_id = _a.public_id;
                        data.thumbnail = secure_url;
                        data.thumbnail_id = public_id;
                        _b.label = 4;
                    case 4: return [4 /*yield*/, product_1.productModel.update(id, data)];
                    case 5:
                        updatedProduct = _b.sent();
                        return [2 /*return*/, res.status(201).json({ updatedProduct: updatedProduct, msg: 'Product Updated' })];
                    case 6:
                        error_4 = _b.sent();
                        if (error_4 instanceof Error) {
                            res.status(500).json({ error: error_4.message });
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.deleteProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, product, deletedProduct, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = req.params.id;
                        return [4 /*yield*/, product_1.productModel.get(id)];
                    case 1:
                        product = (_a.sent())[0];
                        return [4 /*yield*/, cloudinary_1.default.uploader.destroy(product.thumbnail_id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, product_1.productModel.delete(id)];
                    case 3:
                        deletedProduct = _a.sent();
                        return [2 /*return*/, res.json({ deletedProduct: deletedProduct, msg: 'Product Deleted' })];
                    case 4:
                        error_5 = _a.sent();
                        if (error_5 instanceof Error) {
                            res.status(500).json({ error: error_5.message });
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports.productController = new ProductController();
