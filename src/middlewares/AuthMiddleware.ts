import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";


const authConfig = require('../config/auth.json');


class AuthMiddleware {
    static validate (req: Request, res: Response, next: NextFunction) {

        /*
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ "error" : "No token provided." });
        }

        const parts = authHeader.split(' ');
        if(parts.length !== 2) {
            return res.status(401).send({ "error" : "Token was errors." });
        }

        const [ scheme, token ] = parts;
        if(!/^Bearer$/i.test(scheme)) {
            return res.status(401).send({ "error" : "Malformatted token." });
        }

        jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
            if (err) return res.status(401).send({ "error" : "Invalid token." });

            req.headers.userId = decoded.id;
            return next();
        });
        **/

        return next();
    }
}

export default AuthMiddleware;