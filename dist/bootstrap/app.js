"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DBConnection_1 = __importDefault(require("../providers/DBConnection"));
const routes_1 = __importDefault(require("../routes"));
class Application {
    constructor() {
        DBConnection_1.default.openConnection();
        this.app = express_1.default();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.get('/health', (req, res) => res.send("Api Is Working fine."));
        this.app.use('/api/v1', routes_1.default);
    }
}
exports.default = new Application();
//# sourceMappingURL=app.js.map