"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: String,
}, { timestamps: true });
const Product = mongoose_1.model('Product', exports.ProductSchema);
exports.Product = Product;
//# sourceMappingURL=UserSchema.js.map