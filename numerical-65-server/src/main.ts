import dotenv, { DotenvParseOutput } from "dotenv"
import { Connection, set, createConnection } from "mongoose"
import { userRepository } from "./repositories/user"
import { UseCase } from "./use_case/useCase"
import { expressServer } from "./interface/express"
import { methodRepository } from "./repositories/method"
import { WebSocketService } from "./interface/webSocket"
export interface Config extends DotenvParseOutput {
    DB_USER: string,
    DB_PWD: string,
    DB_IP: string,
    DB_PORT: string,
    DB_NAME: string,
    PORT: string,
    SECRET_KEY: string
}

export const initRepository = async (cfg: Config) => {

    var uri = `mongodb://${cfg.DB_USER}:${cfg.DB_PWD}@${cfg.DB_IP}:${cfg.DB_PORT}/${cfg.DB_NAME}`;
    set('strictQuery', false)
    console.log(uri);

    const client: Connection = createConnection(uri);

    client.on('open', function () {
        console.log('MongoDB connection established!');
    });
    var userRepo = new userRepository(client)
    var methodRepo = new methodRepository(client)

    return { userRepo, methodRepo }
}

export const initInterface = async (useCase: UseCase, cfg: Config) => {
    const server = new expressServer(useCase, cfg)
    const webSocket = new WebSocketService(server.server)
    server.start(webSocket)
}

export const start = async () => {
    let cfg = dotenv.config().parsed as Config
    let { userRepo, methodRepo } = await initRepository(cfg)
    let useCase = new UseCase(userRepo, methodRepo, cfg)
    initInterface(useCase, cfg)

}
start()


