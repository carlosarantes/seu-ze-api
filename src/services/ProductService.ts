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
        let product = await Product.findOne({ name : payload.name });
        if(product) {
            console.log('PRODUTO COM ESSE NOME JA EXISTE..VOU ATUALIZAR ENTÃO...');
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

    async incrementQtt(name: string) {
        let product = await Product.findOne({ name });
        if(!product) {
            throw new Error("Este produto não existe.");
        }

        product.quantity = product.quantity + 1;
        product.save();
        console.log('00-PRODUTO ATUALIZADO COM SUCESSO.');
    }

    async decrementQtt(name: string) {
        let product = await Product.findOne({ name });
        if(!product) {
            throw new Error("Este produto não existe.");
        }

        if(!product.quantity) {
            throw new Error("Não é possível decrementar pois esse produto não possui uma quantidade válida.");
        }

        product.quantity = product.quantity - 1;
        product.save();
        console.log('99-PRODUTO ATUALIZADO COM SUCESSO.');
    }
}

export default new ProductService();