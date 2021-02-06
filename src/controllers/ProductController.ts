import { Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const products = await ProductService.findAll();
            return res.json({ "data" : products });
        } catch (e) {
            return res.status(400).json({ "message" : e.message });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const product = await ProductService.findById(id)
            return res.json({ "data" : product });
        } catch (e) {
            return res.status(400).json({ "message" : e.message });
        }
    }

    async findByName(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.params;
            const product = await ProductService.findByName(name);
            return res.json({ "data" : product });
        } catch (e) {
            return res.status(400).json({ "message" : e.message });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const product = await ProductService.create(body);
            return res.status(201).json({ "data" : product });
        } catch (e) {
            return res.status(400).json({ "message" : e.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await ProductService.update(id, body);
            return res.json({ "data" : product });
        } catch (e) {
            return res.status(400).json({ "message" : e.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await ProductService.delete(id);
            return res.status(200).json({ "message" : "Removed successfully" });
        } catch (e) {
            return res.status(400).json({ "message" : e.message });
        }
    }
}

export default new ProductController();