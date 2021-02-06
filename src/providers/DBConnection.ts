import mongoose from "mongoose";

class DBConnection {
    private mongo_uri: string;

    constructor() {
        this.mongo_uri = process.env.MONGO_URI;
    }

    openConnection():void {
        mongoose.connect(this.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) throw err;
        });
    }
}

export default new DBConnection();