import { model, Schema } from "mongoose";

export var ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: String,
}, { timestamps: true });

const Product = model('Product', ProductSchema);

export { Product };