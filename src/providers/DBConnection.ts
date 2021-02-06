import mongoose from "mongoose";
import csv from 'csv-parser';
import fs from "fs";
import path from "path";
import ProductService from "../services/ProductService";

class DBConnection {
    private mongo_uri: string;

    constructor() {
        this.mongo_uri = process.env.MONGO_URI;
    }

    openConnection():void {
        mongoose.connect(this.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) throw err;
            this.populate();
        });
    }

    populate() {
        const products : any[] = [];
        fs.createReadStream(path.resolve(process.cwd(), 'products.csv'))
            .pipe(csv())
            .on('data', (row: any) => {
                row.price = parseFloat(row.price);
                row.quantity = parseInt(row.quantity, 10);

                products.push(row);
            })
            .on('end', () => {
                ProductService.populateAtOnce(products);
            });
    }
}

export default new DBConnection();