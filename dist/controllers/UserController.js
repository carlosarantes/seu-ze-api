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
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserService_1.default.findAll();
                return res.status(200).json({ "data": users });
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
                const user = yield UserService_1.default.findById(id);
                return res.status(200).json({ "data": user });
            }
            catch (e) {
                return res.status(400).json({ "message": e.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield UserService_1.default.login(email, password);
                return res.send(result);
            }
            catch (e) {
                return res.status(400).json({ "message": e.message });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const user = yield UserService_1.default.register(body);
                return res.status(201).json({ "data": user });
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
                const user = yield UserService_1.default.update(id, body);
                return res.status(200).json({ "data": user });
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
                yield UserService_1.default.delete(id);
                return res.status(200).json({ "message": "Removed successfully" });
            }
            catch (e) {
                return res.status(400).json({ "message": e.message });
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map