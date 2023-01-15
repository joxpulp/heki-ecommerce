"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart = void 0;
var mongoose_1 = require("mongoose");
var cartCollection = 'cart';
var cartProductSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'products' },
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 300 },
    category: { type: String, required: true, max: 100 },
    price: {
        type: Number,
        required: true,
        min: [10, "El valor es {VALUE}, debe ser como minimo 10 USD"],
        max: [300000, "El valor es {VALUE}, debe ser como maximo 30000 USD"],
    },
    thumbnail_id: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
    quantity: { type: Number, required: true },
}, { versionKey: false });
var address = new mongoose_1.Schema({
    streetName: { type: String, required: true, max: 100 },
    streetNumber: { type: Number, required: true, max: 100 },
    postalCode: { type: String, required: true, max: 100 },
    floor: { type: Number, max: 100 },
    apt: { type: String, max: 100 },
}, { versionKey: false });
var cartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    total: { type: Number },
    totalItems: { type: Number },
    cartProducts: [cartProductSchema],
    deliveryAddress: [address],
}, { versionKey: false, timestamps: true });
exports.cart = (0, mongoose_1.model)(cartCollection, cartSchema);
