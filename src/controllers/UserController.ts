import { Request, Response} from "express";
import UserService from "../services/UserService";

class UserController {
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const users = await UserService.findAll();
            return res.status(200).json({ "data" : users });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const user = await UserService.findById(id);
            return res.status(200).json({ "data" : user });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const result = await UserService.login(email, password);
            return res.send(result);
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const user = await UserService.register(body);
            return res.status(201).json({ "data" :  user });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body = req.body;
            const user = await UserService.update(id, body);
            return res.status(200).json({ "data" : user });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await UserService.delete(id);
            return res.status(200).json({ "message" : "Removed successfully" });
        } catch (e) {
            const statusCode = e.status || 400;
            const message = e.message || "Ocorreu um erro desconhecido";
            return res.status(statusCode).json({ message });
        }
    }
}

export default new UserController();