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
const OrderService_1 = __importDefault(require("../services/OrderService"));
class OrderController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield OrderService_1.default.findAll();
                return res.json({ "data": orders });
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
                const order = yield OrderService_1.default.findById(id);
                return res.json({ "data": order });
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
                const order = yield OrderService_1.default.create(body);
                return res.status(201).json({ "data": order });
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
                const order = yield OrderService_1.default.update(id, body);
                return res.json({ "data": order });
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
                yield OrderService_1.default.delete(id);
                return res.json({ "message": "Removed successfully." });
            }
            catch (e) {
                return res.status(400).json({ "message": e.message });
            }
        });
    }
}
exports.default = new OrderController();
//# sourceMappingURL=OrderController.js.map