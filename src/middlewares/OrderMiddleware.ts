import { Request, Response, NextFunction } from "express";

class OrderMiddleware {
    static validate (req: Request, res: Response, next: NextFunction) {

        return next();
    }
}

export default OrderMiddleware;