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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../services/ProductService"));
class ProductController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductService_1.default.findAll();
                return res.json({ "data": products });
            }
            catch (e) {
                return res.status(400).json({ "message": e.message });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield ProductService_1.default.findById(id);
                return res.json({ "data": product });
            }
            catch (e) {
                return res.status(400).json({ "message": e.message });
            }
        });
    }
    findByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const product = yield ProductService_1.default.findByName(name);
                return res.json({ "data": product });
            }
            catch (e) {
                return res.status(400).json({ "message": e.message });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const product = yield ProductService_1.default.create(body);
                return res.status(201).json({ "data": product });
            }
            catch (e) {
                return res.status(400).json({ "message": e.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const product = yield ProductService_1.default.update(id, body);
                return res.json({ "data": product });
            }
            catch (e) {
                return res.status(400).json({ "message": e.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield ProductService_1.default.delete(id);
                return res.status(200).json({ "message": "Removed successfully" });
            }
            catch (e) {
                return res.status(400).json({ "message": e.message });
            }
        });
    }
}
exports.default = new ProductController();
//# sourceMappingURL=ProductController.js.map