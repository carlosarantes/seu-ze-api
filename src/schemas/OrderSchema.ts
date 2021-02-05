import { model, Schema } from "mongoose";

export var OrderSchema: Schema = new Schema({
    products: [
        {
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
        }
    ],
    total: {
        type : Number,
        default: 0
    }
}, { timestamps: true });

const Order = model('Order', OrderSchema);

export { Order };