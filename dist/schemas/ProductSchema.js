"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const Product = mongoose_1.model('Product', exports.ProductSchema);
exports.Product = Product;
//# sourceMappingURL=ProductSchema.js.map