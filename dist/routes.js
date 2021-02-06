"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Importing controllers
const ProductController_1 = __importDefault(require("./controllers/ProductController"));
const OrderController_1 = __importDefault(require("./controllers/OrderController"));
// Importing middlewares
const AuthMiddleware_1 = __importDefault(require("./middlewares/AuthMiddleware"));
const OrderMiddleware_1 = __importDefault(require("./middlewares/OrderMiddleware"));
const ProductMiddleware_1 = __importDefault(require("./middlewares/ProductMiddleware"));
const routes = express_1.default.Router();
routes.get('/products', AuthMiddleware_1.default.validate, ProductController_1.default.findAll);
routes.post('/products', AuthMiddleware_1.default.validate, ProductMiddleware_1.default.validate, ProductController_1.default.create);
routes.get('/products/:id', AuthMiddleware_1.default.validate, ProductController_1.default.findById);
routes.get('/products/by-name/:name', AuthMiddleware_1.default.validate, ProductController_1.default.findByNmae);
routes.put('/products/:id', AuthMiddleware_1.default.validate, ProductMiddleware_1.default.validate, ProductController_1.default.update);
routes.delete('/products/:id', AuthMiddleware_1.default.validate, ProductController_1.default.delete);
routes.get('/products', AuthMiddleware_1.default.validate, OrderController_1.default.findAll);
routes.post('/products', AuthMiddleware_1.default.validate, OrderMiddleware_1.default.validate, OrderController_1.default.create);
routes.get('/products/:id', AuthMiddleware_1.default.validate, OrderController_1.default.findById);
routes.put('/products/:id', AuthMiddleware_1.default.validate, OrderMiddleware_1.default.validate, OrderController_1.default.update);
routes.delete('/products/:id', AuthMiddleware_1.default.validate, OrderController_1.default.delete);
exports.default = routes;
//# sourceMappingURL=routes.js.map