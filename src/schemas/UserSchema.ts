import { model, Schema, Document } from "mongoose";
import * as bcrypt from "bcryptjs";

 interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

export let UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    }
}, { timestamps: true });

UserSchema.pre('save', async function(this: IUser, next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = model<IUser>('User', UserSchema);

export { User };