import { Request, Response, NextFunction } from "express";

class OrderMiddleware {
    static validateBeforeSave (req: Request, res: Response, next: NextFunction) {

        const body = req.body;
        const errors = [];

        if(!body.products) {
            errors.push("Lista de produtos é obrigatória para criar o pedido.");
        }

        if(!Array.isArray(body.products)) {
            errors.push("Produtos deve ser um array de objetos.");
        }


        let noNameCount = 0;
        let noQttCount = 0;
        let noPriceCount = 0;
        for (const key in body.products) {
            const product = body.products[key];
            if(!product.name) {
                noNameCount++;
            }

            if(!product.quantity) {
                noQttCount++;
            }

            if(!product.price) {
                noPriceCount++;
            }
        }

        if(noNameCount > 0) {
            errors.push(`Existem ${noNameCount} itens sem nome. Corrija os incluindo o atributo "name".`);
        }

        if(noQttCount > 0) {
            errors.push(`Existem ${noQttCount} itens sem quantidade. Corrija os incluindo o atributo "quantity".`);
        }

        if(noPriceCount > 0) {
            errors.push(`Existem ${noPriceCount} itens sem quantidade. Corrija os incluindo o atributo "price".`);
        }

        if(errors.length > 0) {
            return res.status(422).json({ errors });
        }

        return next();
    }
}

export default OrderMiddleware;