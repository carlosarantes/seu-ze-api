import { model, Schema, Document } from "mongoose";

interface IOrder extends Document {
    products: any[];
    total: number;
}

export let OrderSchema: Schema = new Schema({
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

const Order = model<IOrder>('Order', OrderSchema);

export { Order };