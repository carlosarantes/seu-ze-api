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
const OrderSchema_1 = require("../schemas/OrderSchema");
class OrderService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OrderSchema_1.Order.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield OrderSchema_1.Order.findById(id);
            if (!order) {
                throw new Error("Pedido não encontrado.");
            }
            return order;
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OrderSchema_1.Order.create(payload);
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let updated = yield OrderSchema_1.Order.findByIdAndUpdate(id, payload).lean();
            if (!updated) {
                throw new Error("Ocorreu um erro ao atualizar, talvez o registro não exista.");
            }
            updated = Object.assign(Object.assign({}, updated), payload);
            return updated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield OrderSchema_1.Order.findByIdAndDelete(id);
            if (!deleted) {
                throw new Error("Não foi possível deletar, provavelmente este registro não existe.");
            }
        });
    }
}
exports.default = new OrderService();
//# sourceMappingURL=OrderService.js.map