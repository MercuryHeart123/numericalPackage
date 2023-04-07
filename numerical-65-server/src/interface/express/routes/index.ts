import Express, { Router } from "express";
import { UseCase } from "../../../use_case/useCase";
import { apiRouter } from './routers/apirouter'
import { authRouter } from './routers/authrouter'
import { authController } from "./controllers/authcontroller"
import { apiController } from "./controllers/apicontroller";
import { WebSocketService } from "../../webSocket";

export const mainRouter = (useCase: UseCase, webSocket: WebSocketService) => {
    const router: Router = Express.Router()
    const AuthController = new authController(useCase.authUseCase, webSocket)
    const ApiController = new apiController(useCase.apiUseCase, webSocket)

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })
    router.use('/api', apiRouter(ApiController, AuthController))
    router.use('/auth', authRouter(AuthController))
    return router
}

