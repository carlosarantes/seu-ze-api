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
Object.defineProperty(exports, "__esModule", { value: true });
const ProductSchema_1 = require("../schemas/ProductSchema");
class ProductController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield ProductSchema_1.Product.find();
            return res.status(200).json({ "data": orders });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const order = yield ProductSchema_1.Product.findById(id);
            return res.status(200).json({ "data": order });
        });
    }
    findByNmae(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ "message": "Created successfully" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req.body;
            const order = yield ProductSchema_1.Product.create(body);
            return res.status(201).json({ "data": order });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req.body;
            const order = yield ProductSchema_1.Product.updateOne({ id }, { $set: body });
            return res.status(200).json({ "data": order });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield ProductSchema_1.Product.deleteOne({ id });
            return res.status(200).json({ "message": "Removed successfully" });
        });
    }
}
exports.default = new ProductController();
//# sourceMappingURL=ProductController.js.map