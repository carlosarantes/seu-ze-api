import { Request, Response, NextFunction } from "express";

class AuthMiddleware {
    static validate (req: Request, res: Response, next: NextFunction) {

        return next();
    }
}

export default AuthMiddleware;