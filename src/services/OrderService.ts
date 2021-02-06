import mongoose from "mongoose";
import { Order } from "../schemas/OrderSchema";
import { Product } from "../schemas/ProductSchema";

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

        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            const productsToUpdate  = [];

            for (const productData of payload.products) {
                if(productData) {
                    const product = await Product.findOne({ name : productData.name });
                    if(!product) {
                        throw new Error(`Não é possível realizar o pedido pois o produto ${productData.name} não existe. Confira a lista de produtos.`);
                    }

                    if(!product.quantity || product.quantity <= 0) {
                        throw new Error(`Não é possível realizar o pedido pois o produto ${productData.name} não está disponível em estoque.`);
                    }

                    if(product.quantity < productData.quantity) {
                        throw new Error(`Não é possível pedir ${productData.quantity}x do produto ${productData.name}. Disponível apenas ${product.quantity}.`)
                    }

                    product.quantity = product.quantity - productData.quantity;
                    productsToUpdate.push(product);
                }
            }

            productsToUpdate.forEach(product => product.save());

            const order = await Order.create(payload);
            await session.commitTransaction();
            session.endSession();

            return order;
        } catch(e) {
            await session.abortTransaction();
            session.endSession();
            throw e;
        }
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