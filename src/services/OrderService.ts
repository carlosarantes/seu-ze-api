import { Order } from "../schemas/OrderSchema";

class OrderService {
    async findAll(req: Request, res: Response): Promise<Response> {
        const orders = await Order.find();
        return res.status(200).json({ "data" : orders });
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const order = await Order.findById(id);
        return res.status(200).json({ "data" : order });
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { body } = req.body;
        const order = await Order.create(body);
        return res.status(201).json({ "data" :  order });
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { body } = req.body;
        const order = await Order.updateOne({ id }, { $set : body});
        return res.status(200).json({ "data" : order });
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        await Order.deleteOne({ id });
        return res.status(200).json({ "message" : "Removed successfully" });
    }
}

export default new OrderService();