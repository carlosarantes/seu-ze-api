import { Error } from "mongoose";

class HttpError extends Error {
    status: number;

    constructor (message: string, status: number) {
        super(message);
        this.status = status;
    }
    
    statusCode() {
        return this.status;
    }
}

export default HttpError;