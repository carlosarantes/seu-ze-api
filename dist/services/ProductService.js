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
class ProductService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.Product.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductSchema_1.Product.findById(id);
            if (!product) {
                throw new Error("Produto não encontrado.");
            }
            return product;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductSchema_1.Product.find({ name });
            if (!product) {
                throw new Error("Produto não encontrado.");
            }
            return product;
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.Product.create(payload);
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let updated = yield ProductSchema_1.Product.findByIdAndUpdate(id, payload).lean();
            if (!updated) {
                throw new Error("Ocorreu um erro ao atualizar, talvez o registro não exista.");
            }
            updated = Object.assign(Object.assign({}, updated), payload);
            return updated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield ProductSchema_1.Product.findByIdAndDelete(id);
            if (!deleted) {
                throw new Error("Não foi possível deletar, provavelmente este registro não existe.");
            }
        });
    }
}
exports.default = new ProductService();
//# sourceMappingURL=ProductService.js.map