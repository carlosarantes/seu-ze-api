import { User } from "../schemas/UserSchema";
import * as bcrypt from "bcryptjs";

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
            throw new Error("User not found.");
        }

        return user;
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw new Error("User not found.");
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new Error("Invalid password.");
        }

        user.password = undefined;
        const token =  generateToken({ id: user.id });

       return { user, token };
    }

    async register(payload: any) {
        if (await User.findOne({ email : payload.email })) {
            throw new Error("User already exists.");
        }

        const user = await User.create(payload);

        user.password = undefined;
        const token = generateToken({ id: user.id });
        return { user, token };
    }

    async update(id: string, payload: any) {
        let updated = await User.findByIdAndUpdate(id, payload).lean();
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
        const deleted = await User.findByIdAndDelete(id);
        if(!deleted) {
            throw new Error("Não foi possível deletar, provavelmente este registro não existe.");
        }
    }
}

export default new UserService();