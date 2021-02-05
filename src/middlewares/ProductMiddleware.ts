import { Request, Response, NextFunction } from "express";

class ProductMiddleware {
    static validate (req: Request, res: Response, next: NextFunction) {

        return next();
    }
}

export default ProductMiddleware;