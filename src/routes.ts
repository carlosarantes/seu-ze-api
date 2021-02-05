import express, { Router } from "express";
import ProductController from "./controllers/ProductController";
import OrderController from "./controllers/OrderController";

const routes: Router = express.Router();

routes.get('/products', ProductController.findAll);
routes.post('/products', ProductController.create);
routes.get('/products/:id', ProductController.findById);
routes.get('/products/by-name/:name', ProductController.findByNmae);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.get('/products', OrderController.findAll);
routes.post('/products', OrderController.create);
routes.get('/products/:id', OrderController.findById);
routes.put('/products/:id', OrderController.update);
routes.delete('/products/:id', OrderController.delete);

export default routes;