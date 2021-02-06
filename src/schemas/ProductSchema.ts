import { model, Schema, Document } from "mongoose";

interface IProduct extends Document {
    name: string;
    quantity: number;
    price: number;
}

export let ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Product = model<IProduct>('Product', ProductSchema);

export { Product };