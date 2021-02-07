import mongoose from "mongoose";
import { Order } from "../schemas/OrderSchema";
import { Product } from "../schemas/ProductSchema";
import HttpError from "../exceptions/HttpError";

class OrderService {
    async findAll() {
        return await Order.find();
    }

    async findById(id: string) {
        const order = await Order.findById(id);
        if(!order) {
            throw new HttpError("Pedido não encontrado.", 404);
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
                        throw new HttpError(`Não é possível realizar o pedido pois o produto ${productData.name} não existe. Confira a lista de produtos.`, 422);
                    }

                    if(!product.quantity || product.quantity <= 0) {
                        throw new HttpError(`Não é possível realizar o pedido pois o produto ${productData.name} não está disponível em estoque.`, 422);
                    }

                    if(product.quantity < productData.quantity) {
                        throw new HttpError(`Não é possível pedir ${productData.quantity}x do produto ${productData.name}. Disponível apenas ${product.quantity}.`, 422)
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
            throw new HttpError("Ocorreu um erro ao atualizar, talvez o registro não exista.", 404);
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
            throw new HttpError("Não foi possível deletar, provavelmente este registro não existe.", 404);
        }
    }
}

export default new OrderService();