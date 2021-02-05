import express, { Router } from "express";

// Importing controllers
import ProductController from "./controllers/ProductController";
import OrderController from "./controllers/OrderController";

// Importing middlewares
import AuthMiddleware from "./middlewares/AuthMiddleware";
import OrderMiddleware from "./middlewares/OrderMiddleware";
import ProductMiddleware from "./middlewares/ProductMiddleware";

const routes: Router = express.Router();

routes.get('/products', AuthMiddleware.validate,  ProductController.findAll);
routes.post('/products', AuthMiddleware.validate, ProductMiddleware.validate, ProductController.create);
routes.get('/products/:id', AuthMiddleware.validate, ProductController.findById);
routes.get('/products/by-name/:name', AuthMiddleware.validate, ProductController.findByNmae);
routes.put('/products/:id', AuthMiddleware.validate, ProductMiddleware.validate, ProductController.update);
routes.delete('/products/:id', AuthMiddleware.validate, ProductController.delete);

routes.get('/products', AuthMiddleware.validate, OrderController.findAll);
routes.post('/products', AuthMiddleware.validate, OrderMiddleware.validate, OrderController.create);
routes.get('/products/:id', AuthMiddleware.validate, OrderController.findById);
routes.put('/products/:id', AuthMiddleware.validate, OrderMiddleware.validate, OrderController.update);
routes.delete('/products/:id', AuthMiddleware.validate, OrderController.delete);

export default routes;