import { Request, Response, NextFunction } from "express";

/**
 * @TODO
 * - popular banco a partir de arquivo .CSV
 * - listener do rabbitmq
 * - validações
 * - regra de validação de estoque
 * - swagger (se der tempo)
 * - docker compose
 * - dodumentação
 */

class ProductMiddleware {
    static validateBeforeSave (req: Request, res: Response, next: NextFunction) {

        const body = req.body;
        const errors = [];

        if(!body.name) {
            errors.push("Você deve informar um nome de produto válido.");
        }

        if(body.name && body.name.length < 3) {
            errors.push("Nome do produto deve ter pelo menos 3 caracteres.")
        }

        if(body.quantity === null || body.quantity === undefined) {
            errors.push("Quantidade é obrigatória.")
        }

        if(parseInt(body.quantity) === NaN) {
            errors.push("Quantidade deve ser um número (a partir de 0).");
        }

        if(parseInt(body.quantity) < 0) {
            errors.push("Não é possível cadastrar um produto com quantidade abaixo de zero.");
        }

        if(body.price === null || body.price === undefined) {
            errors.push("Preço é obrigatório.")
        }

        if(parseFloat(body.price) === NaN) {
            errors.push("Preço deve ser um número (a partir de 0).");
        }

        if(parseFloat(body.price) < 0) {
            errors.push("Não é possível cadastrar um produto com preço abaixo de zero.");
        }

        if (errors.length > 0) {
            return res.status(422).json({ errors });
        }

        return next();
    }
}

export default ProductMiddleware;