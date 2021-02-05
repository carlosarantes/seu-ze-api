import { model, Schema } from "mongoose";

export var ProductSchema: Schema = new Schema({
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

const Product = model('Product', ProductSchema);

export { Product };