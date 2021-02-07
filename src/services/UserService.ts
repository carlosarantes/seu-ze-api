import { User } from "../schemas/UserSchema";
import * as bcrypt from "bcryptjs";
import HttpError from "../exceptions/HttpError";

import * as jwt from "jsonwebtoken";
import authConfig from "../config/auth.json";

const generateToken = (payload: any) => {
    return jwt.sign(payload, authConfig.secret, {
        expiresIn: 86400,
    });
}

class UserService {

    async findAll() {
        return await User.find();
    }

    async findById(id: string) {
        const user = await User.findById(id);
        if(!user) {
            throw new HttpError("User not found.", 404);
        }

        return user;
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw new HttpError("User not found.", 404);
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new HttpError("Invalid password.", 401);
        }

        user.password = undefined;
        const token =  generateToken({ id: user.id });

       return { user, token };
    }

    async register(payload: any) {
        if (await User.findOne({ email : payload.email })) {
            throw new HttpError("User already exists.", 403);
        }

        const user = await User.create(payload);

        user.password = undefined;
        const token = generateToken({ id: user.id });
        return { user, token };
    }

    async update(id: string, payload: any) {
        let updated = await User.findByIdAndUpdate(id, payload).lean();
        if(!updated) {
            throw new HttpError("Ocorreu um erro ao atualizar, talvez o registro não exista.", 404);
        }

        updated = {
            ...updated,
            ...payload
        };

        return updated;
    }

    async delete(id: string) {
        const deleted = await User.findByIdAndDelete(id);
        if(!deleted) {
            throw new HttpError("Não foi possível deletar, provavelmente este registro não existe.", 404);
        }
    }
}

export default new UserService();