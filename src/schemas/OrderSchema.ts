import { model, Schema, Document } from "mongoose";

interface IOrder extends Document {
    products: any[];
    total: number;
    status : string;
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
    },
    status : String
}, { timestamps: true });

OrderSchema.pre('save', async function(this: IOrder, next) {
    let total = 0;
    for (let index = 0; index < this.products.length; index++) {
        const product = this.products[index];
        total += product.quantity * product.price;
    }

    this.total = total;
    this.status = "APPROVED";
    next();
});

const Order = model<IOrder>('Order', OrderSchema);

export { Order };