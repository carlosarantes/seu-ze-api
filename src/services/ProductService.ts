import { Product } from "../schemas/ProductSchema";

class ProductService {
    async findAll(req: Request, res: Response): Promise<Response> {
        const orders = await Product.find();
        return res.status(200).json({ "data" : orders });
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const order = await Product.findById(id);
        return res.status(200).json({ "data" : order });
    }

    async findByNmae(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({ "message" : "Created successfully" });
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { body } = req.body;
        const order = await Product.create(body);
        return res.status(201).json({ "data" :  order });
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { body } = req.body;
        const order = await Product.updateOne({ id }, { $set : body});
        return res.status(200).json({ "data" : order });
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        await Product.deleteOne({ id });
        return res.status(200).json({ "message" : "Removed successfully" });
    }
}

export default new ProductService();