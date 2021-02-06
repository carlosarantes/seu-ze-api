import { Product } from "../schemas/ProductSchema";

class ProductService {
    async findAll() {
        return await Product.find();
    }

    async findById(id: string) {
        const product = await Product.findById(id);
        if(!product) {
            throw new Error("Produto não encontrado.");
        }

        return product;
    }

    async findByName(name: string) {
        const product = await Product.find({ name });
        if(!product) {
            throw new Error("Produto não encontrado.");
        }

        return product;
    }

    async create(payload: any) {
        return await Product.create(payload);
    }

    async update(id: string, payload: any) {
        let updated = await Product.findByIdAndUpdate(id, payload).lean();
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
        const deleted = await Product.findByIdAndDelete(id);
        if(!deleted) {
            throw new Error("Não foi possível deletar, provavelmente este registro não existe.");
        }
    }
}

export default new ProductService();