"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthMiddleware {
    static validateBeforeSave(req, res, next) {
        const body = req.body;
        const errors = [];
        if (!body.name) {
            errors.push("Nome do usuário é obrigatório.");
        }
        if (body.name && body.name.length < 3) {
            errors.push("Nome do usuário deve conter pelo menos 3 caracteres.");
        }
        if (!body.email) {
            errors.push("E-mail é obrigatório.");
        }
        if (body.email && body.email.length < 8) {
            errors.push("E-mail deve conter pelo menos 8 caracteres.");
        }
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(body.email)) {
            errors.push("Você deve informar um e-mail válido.");
        }
        if (!body.password) {
            errors.push("Senha é obrigatória.");
        }
        if (body.password && (body.password.length < 8 || body.password.length > 18)) {
            errors.push("Senha deve conter entre 8 e 18 caracteres.");
        }
        if (errors.length > 0) {
            return res.status(422).json({ errors });
        }
        return next();
    }
    static validate(req, res, next) {
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
exports.default = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map