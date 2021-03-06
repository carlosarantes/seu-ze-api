import express, { Router } from "express";

// Importing controllers
import ProductController from "./controllers/ProductController";
import OrderController from "./controllers/OrderController";
import UserController from "./controllers/UserController";

// Importing middlewares
import AuthMiddleware from "./middlewares/AuthMiddleware";
import OrderMiddleware from "./middlewares/OrderMiddleware";
import ProductMiddleware from "./middlewares/ProductMiddleware";

const routes: Router = express.Router();

// User routes
routes.get('/users', AuthMiddleware.validate, UserController.findAll);
routes.post('/users/register', AuthMiddleware.validateBeforeSave, UserController.register);
routes.post('/users/login', UserController.login);
routes.get('/users/:id', AuthMiddleware.validate, UserController.findById);
routes.put('/users/:id', AuthMiddleware.validate, UserController.update);
routes.delete('/users/:id', AuthMiddleware.validate, UserController.delete);

// Products routes
routes.get('/products', AuthMiddleware.validate,  ProductController.findAll);
routes.post('/products', AuthMiddleware.validate, ProductMiddleware.validateBeforeSave, ProductController.create);
routes.get('/products/:id', AuthMiddleware.validate, ProductController.findById);
routes.get('/products/by-name/:name', AuthMiddleware.validate, ProductController.findByName);
routes.put('/products/:id', AuthMiddleware.validate, ProductMiddleware.validateBeforeSave, ProductController.update);
routes.delete('/products/:id', AuthMiddleware.validate, ProductController.delete);

// Orders routes
routes.get('/orders', AuthMiddleware.validate, OrderController.findAll);
routes.post('/orders', AuthMiddleware.validate, OrderMiddleware.validateBeforeSave, OrderController.create);
routes.get('/orders/:id', AuthMiddleware.validate, OrderController.findById);
routes.put('/orders/:id', AuthMiddleware.validate, OrderMiddleware.validateBeforeSave, OrderController.update);
routes.delete('/orders/:id', AuthMiddleware.validate, OrderController.delete);

export default routes;