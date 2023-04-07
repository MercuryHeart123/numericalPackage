import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../../utill/errUtill";
import { responseReturn } from "../../utill/interface";
import { authUseCase } from "../../../../use_case/authUseCase";
import { WebSocketService } from "../../../webSocket";
export class authController {
    private useCase: authUseCase
    private webSocket?: WebSocketService
    constructor(useCase: authUseCase, webSocket?: WebSocketService) {
        this.useCase = useCase
        this.webSocket = webSocket
    }


    /**
     * @openapi
     * components:
     *  schemas:
     *      getLogin:
     *          type: object
     *          required:
     *              - status
     *              - success
     *              - msg
     *          properties:
     *              status:
     *                  type: string
     *                  description: status of response
     *              success:
     *                  type: boolean
     *                  description: success or not
     *              msg:
     *                  type: string
     *                  description: message of response
     *              data:
     *                  type: object
     *                  properties:
     *                   isAdmin:
     *                     type: boolean
     *                     description: is admin or not
     *                   username:
     *                     type: string
     *                     description: username
     *                  description: data of response
     */



    public loginVerify = async (req: Request, res: Response) => {
        var response: responseReturn

        try {
            var token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                throw new Error('Please authenticate');
            }
            let decoded = await this.useCase.verifyToken(token);
            if (this.webSocket) {
                this.webSocket.broadcast(`User ${(<any>decoded).username} verify token`)
            }
            response = {
                status: 'success',
                success: true,
                msg: 'verify token success',
                data: {
                    username: (<any>decoded).username,
                    isAdmin: (<any>decoded).isAdmin
                }
            }
            return res.status(200).send(response);

            // next();
        } catch (error) {
            let errMsg = getErrorMessage(error)
            if (this.webSocket) {
                this.webSocket.broadcast(`ERROR : ${errMsg}`)
            }
            response = {
                status: 'error',
                success: false,
                msg: errMsg
            }
            return res.status(401).send(response);
        }
    }

    /**
     * @openapi
     * components:
     *  schemas:
     *      loginRequest:
     *          type: object
     *          required:
     *              - username
     *              - password
     *          properties:
     *              username:
     *                  type: string
     *                  description: username
     *                  default: heart
     *              password:
     *                  type: string
     *                  description: password
     *                  default: 1234
     */


    public postLogin = async (req: Request, res: Response) => {
        var response: responseReturn
        try {
            let { username, password } = req.body
            const foundUser = await this.useCase.login(username, password);
            response = {
                status: 'success',
                success: true,
                msg: 'Login successful',
                data: foundUser
            }
            console.log(this.webSocket);
            if (this.webSocket) {
                this.webSocket.broadcast(`User ${foundUser.username} login`)

            }

            return res.status(200).send(response);
        } catch (error) {
            let errMsg = getErrorMessage(error)
            if (this.webSocket) {
                this.webSocket.broadcast(`ERROR : ${errMsg}`)
            }
            response = {
                status: 'error',
                success: false,
                msg: errMsg
            }
            return res.status(500).send(response);
        }

    }


    /**
     * @openapi
     * components:
     *  schemas:
     *      registerRequest:
     *          type: object
     *          required:
     *              - username
     *              - password
     *          properties:
     *              username:
     *                  type: string
     *                  description: username
     *                  default: heart
     *              password:
     *                  type: string
     *                  description: password
     *                  default: 1234
     */
    public registerOne = async (req: Request, res: Response) => {
        var response: responseReturn
        try {
            let username = req.body.username
            let foundUser = await this.useCase.findOne(username)
            if (foundUser) {
                throw new Error('User already exist');
            }
            let { password } = req.body

            if (!username || password) {
                throw new Error('Username and password are required');
            }

            this.useCase.register(username, password);
            if (this.webSocket) {
                this.webSocket.broadcast(`User ${req.body.username} register`)
            }
            response = {
                status: 'success',
                success: true,
                msg: 'User registered successfully'
            }
            return res.status(200).send(response);
        } catch (error) {

            let errMsg = getErrorMessage(error)
            if (this.webSocket) {
                this.webSocket.broadcast(`ERROR : ${errMsg}`)
            }
            response = {
                status: 'error',
                success: false,
                msg: getErrorMessage(error)
            }
            return res.status(500).send(response);
        }
    };


    public verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                throw new Error('Please authenticate');
            }
            let decoded = await this.useCase.verifyToken(token);

            if ((<any>decoded).isAdmin) {
                next();
            } else {
                throw new Error('You are not admin');
            }
        } catch (error) {
            let errMsg = getErrorMessage(error)
            if (this.webSocket) {
                this.webSocket.broadcast(`ERROR : ${errMsg}`)
            }
            let response = {
                status: 'error',
                success: false,
                msg: errMsg
            } as responseReturn
            return res.status(401).send(response);
        }
    }

    public verifyUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                throw new Error('Please authenticate');
            }
            let decoded = this.useCase.verifyToken(token);
            if ((<any>decoded).username) {
                next();
            } else {
                throw new Error('You are not user');
            }
        } catch (error) {
            let errMsg = getErrorMessage(error)
            if (this.webSocket) {
                this.webSocket.broadcast(`ERROR : ${errMsg}`)
            }
            let response = {
                status: 'error',
                success: false,
                msg: errMsg
            } as responseReturn
            return res.status(401).send(response);
        }
    }
}