"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Importing controllers
const ProductController_1 = __importDefault(require("./controllers/ProductController"));
const OrderController_1 = __importDefault(require("./controllers/OrderController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
// Importing middlewares
const AuthMiddleware_1 = __importDefault(require("./middlewares/AuthMiddleware"));
const OrderMiddleware_1 = __importDefault(require("./middlewares/OrderMiddleware"));
const ProductMiddleware_1 = __importDefault(require("./middlewares/ProductMiddleware"));
const routes = express_1.default.Router();
// User routes
routes.get('/users', AuthMiddleware_1.default.validate, UserController_1.default.findAll);
routes.post('/users/register', AuthMiddleware_1.default.validateBeforeSave, UserController_1.default.register);
routes.post('/users/login', UserController_1.default.login);
routes.get('/users/:id', AuthMiddleware_1.default.validate, UserController_1.default.findById);
routes.put('/users/:id', AuthMiddleware_1.default.validate, UserController_1.default.update);
routes.delete('/users/:id', AuthMiddleware_1.default.validate, UserController_1.default.delete);
// Products routes
routes.get('/products', AuthMiddleware_1.default.validate, ProductController_1.default.findAll);
routes.post('/products', AuthMiddleware_1.default.validate, ProductMiddleware_1.default.validateBeforeSave, ProductController_1.default.create);
routes.get('/products/:id', AuthMiddleware_1.default.validate, ProductController_1.default.findById);
routes.get('/products/by-name/:name', AuthMiddleware_1.default.validate, ProductController_1.default.findByName);
routes.put('/products/:id', AuthMiddleware_1.default.validate, ProductMiddleware_1.default.validateBeforeSave, ProductController_1.default.update);
routes.delete('/products/:id', AuthMiddleware_1.default.validate, ProductController_1.default.delete);
// Orders routes
routes.get('/orders', AuthMiddleware_1.default.validate, OrderController_1.default.findAll);
routes.post('/orders', AuthMiddleware_1.default.validate, OrderMiddleware_1.default.validateBeforeSave, OrderController_1.default.create);
routes.get('/orders/:id', AuthMiddleware_1.default.validate, OrderController_1.default.findById);
routes.put('/orders/:id', AuthMiddleware_1.default.validate, OrderMiddleware_1.default.validateBeforeSave, OrderController_1.default.update);
routes.delete('/orders/:id', AuthMiddleware_1.default.validate, OrderController_1.default.delete);
exports.default = routes;
//# sourceMappingURL=routes.js.map