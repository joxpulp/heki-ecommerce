"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = void 0;
var mongoose_1 = require("mongoose");
var orderCollection = 'order';
var orderProductSchema = new mongoose_1.Schema({
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
var orderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    purchases: [orderProductSchema],
    state: { type: String, default: 'generated' },
    total: { type: Number },
}, { versionKey: false, timestamps: true });
exports.order = (0, mongoose_1.model)(orderCollection, orderSchema);
