import { Order } from "../schemas/OrderSchema";

class OrderService {
    async findAll() {
        return await Order.find();
    }

    async findById(id: string) {
        const order = await Order.findById(id);
        if(!order) {
            throw new Error("Pedido não encontrado.");
        }

        return order;
    }

    async create(payload: any) {
        return await Order.create(payload);
    }

    async update(id: string, payload: any) {
        let updated = await Order.findByIdAndUpdate(id, payload).lean();
        if(!updated) {
            throw new Error("Ocorreu um erro ao atualizar, talvez o registro não exista.");
        }

        updated = {
            ...updated,
            ...payload
        };

        return updated;
    }

    async delete(id: string) {
        const deleted = await Order.findByIdAndDelete(id);
        if(!deleted) {
            throw new Error("Não foi possível deletar, provavelmente este registro não existe.");
        }
    }
}

export default new OrderService();