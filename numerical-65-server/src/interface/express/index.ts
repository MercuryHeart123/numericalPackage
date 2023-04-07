import Express, { Application, Request, Response, NextFunction } from "express"
import { mainRouter } from './routes'
import cors from 'cors'
import http, { Server } from 'http';
import { Config } from "../../main"
import { UseCase } from "../../use_case/useCase";
import { WebSocketService } from "../webSocket"
import { swaggerDocs } from "./utill/swagger";

export class expressServer {
    private app: Application
    public server: Server
    private useCase: UseCase
    private port: string
    constructor(useCase: UseCase, cfg: Config) {
        this.useCase = useCase
        this.app = Express()
        this.app.use(Express.urlencoded())
        this.app.use(Express.json())
        this.app.use(cors<Request>())
        this.server = http.createServer(this.app)
        this.port = cfg.PORT


    }
    public start(webSocket: WebSocketService) {


        this.app.use(mainRouter(this.useCase, webSocket))
        swaggerDocs(this.app)
        this.app.use((req: Request, res: Response) => {
            res.status(404).send("Error 404 not found")
        })

        this.server.listen(this.port, () => {
            console.log(`server start at : http://localhost:${this.port}`)
        })
    }
}