"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
var mongoose_1 = require("mongoose");
var messagesCollection = 'message';
var messagesSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    type: { type: String, required: true, max: 100 },
    message: { type: String, required: true, max: 100 },
}, { versionKey: false });
exports.messages = (0, mongoose_1.model)(messagesCollection, messagesSchema);
