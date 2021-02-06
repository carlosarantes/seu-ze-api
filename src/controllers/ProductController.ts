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

       // return res.status(200).json({ "message" : "Created successfully" });
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {

        } catch (e) {
            return res.status(400).json({ "message" : e.message });
        }

       /*
        const { body } = req.body;
        const order = await Product.create(body);
        return res.status(201).json({ "data" :  order });
        */
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {

        } catch (e) {
            return res.status(400).json({ "message" : e.message });
        }

        /*
        const { id } = req.params;
        const { body } = req.body;
        const order = await Product.updateOne({ id }, { $set : body});
        return res.status(200).json({ "data" : order });
        */
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {

        } catch (e) {
            return res.status(400).json({ "message" : e.message });
        }

        /*
        const { id } = req.params;
        await Product.deleteOne({ id });
        return res.status(200).json({ "message" : "Removed successfully" });
        */
    }
}

export default new ProductController();