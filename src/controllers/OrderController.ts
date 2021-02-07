import { Request, Response } from "express";
import OrderService from "../services/OrderService";

class OrderController {

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const orders = await OrderService.findAll();
            return res.json({ "orders" : orders });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const order = await OrderService.findById(id);
            return res.json({ "order" : order });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const order = await OrderService.create(body);
            return res.status(201).json({ "order" : order });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body = req.body;
            const order = await OrderService.update(id, body);
            return res.json({ "order" : order });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await OrderService.delete(id);
            return res.json({ "message" : "Removed successfully." });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }
}

export default new OrderController();