import express, { Express, Request, Response } from "express";
import DBConnection from "../services/DBConnection";
import routes from "../routes";

class Application {
    app : Express;

    constructor(){
        DBConnection.openConnection();
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares():void {3
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes():void {
        this.app.get('/health', (req: Request, res: Response) => res.send("Api Is Working fine.") );
        this.app.use('/api/v1', routes);
    }
}

export default new Application();