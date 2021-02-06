"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class DBConnection {
    constructor() {
        this.mongo_uri = process.env.MONGO_URI;
    }
    openConnection() {
        mongoose_1.default.connect(this.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err)
                throw err;
        });
    }
}
exports.default = new DBConnection();
//# sourceMappingURL=DBConnection.js.map