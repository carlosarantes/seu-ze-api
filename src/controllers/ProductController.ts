import { Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const products = await ProductService.findAll();
            return res.json({ "products" : products });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const product = await ProductService.findById(id)
            return res.json({ "product" : product });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async findByName(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.params;
            const product = await ProductService.findByName(name);
            return res.json({ "product" : product });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const product = await ProductService.create(body);
            return res.status(201).json({ "product" : product });
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
            const product = await ProductService.update(id, body);
            return res.json({ "product" : product });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await ProductService.delete(id);
            return res.status(200).json({ "message" : "Removed successfully" });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }
}

export default new ProductController();