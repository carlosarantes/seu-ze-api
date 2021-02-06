"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const UserSchema_1 = require("../schemas/UserSchema");
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const auth_json_1 = __importDefault(require("../config/auth.json"));
const generateToken = (payload) => {
    return jwt.sign(payload, auth_json_1.default.secret, {
        expiresIn: 86400,
    });
};
class UserService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserSchema_1.User.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserSchema_1.User.findById(id);
            if (!user) {
                throw new Error("User not found.");
            }
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserSchema_1.User.findOne({ email }).select('+password');
            if (!user) {
                throw new Error("User not found.");
            }
            if (!(yield bcrypt.compare(password, user.password))) {
                throw new Error("Invalid password.");
            }
            user.password = undefined;
            const token = generateToken({ id: user.id });
            return { user, token };
        });
    }
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield UserSchema_1.User.findOne({ email: payload.email })) {
                throw new Error("User already exists.");
            }
            const user = yield UserSchema_1.User.create(payload);
            user.password = undefined;
            const token = generateToken({ id: user.id });
            return { user, token };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let updated = yield UserSchema_1.User.findByIdAndUpdate(id, payload).lean();
            if (!updated) {
                throw new Error("Ocorreu um erro ao atualizar, talvez o registro não exista.");
            }
            updated = Object.assign(Object.assign({}, updated), payload);
            return updated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield UserSchema_1.User.findByIdAndDelete(id);
            if (!deleted) {
                throw new Error("Não foi possível deletar, provavelmente este registro não existe.");
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map