import { Product } from "../schemas/ProductSchema";
import HttpError from "../exceptions/HttpError";

class ProductService {
    async findAll() {
        return await Product.find();
    }

    async findById(id: string) {
        const product = await Product.findById(id);
        if(!product) {
            throw new HttpError("Produto não encontrado.", 404);
        }

        return product;
    }

    async findByName(name: string) {
        const product = await Product.find({ name });
        if(!product) {
            throw new HttpError("Produto não encontrado.", 404);
        }

        return product;
    }

    async create(payload: any) {
        const product = await Product.findOne({ name : payload.name });
        if(product) {
            return await this.update(product.id, payload);
        }

        return await Product.create(payload);
    }

    async populateAtOnce(payload: any[]) {
        const qtd = await Product.count();
        if(!qtd) {
           return await Product.create(payload);
        }
    }

    async update(id: string, payload: any) {
        let updated = await Product.findByIdAndUpdate(id, payload).lean();
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
        const deleted = await Product.findByIdAndDelete(id);
        if(!deleted) {
            throw new HttpError("Não foi possível deletar, provavelmente este registro não existe.", 404);
        }
    }

    async incrementQtt(name: string) {
        const product = await Product.findOne({ name });
        if(!product) {
            throw new HttpError("Este produto não existe.", 404);
        }

        product.quantity = product.quantity + 1;
        product.save();
    }

    async decrementQtt(name: string) {
        const product = await Product.findOne({ name });
        if(!product) {
            throw new HttpError("Este produto não existe.", 404);
        }

        if(!product.quantity) {
            throw new HttpError("Não é possível decrementar pois esse produto não possui uma quantidade válida.", 422);
        }

        product.quantity = product.quantity - 1;
        product.save();
    }
}

export default new ProductService();