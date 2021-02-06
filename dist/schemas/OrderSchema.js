"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    products: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
const Order = mongoose_1.model('Order', exports.OrderSchema);
exports.Order = Order;
//# sourceMappingURL=OrderSchema.js.map