import { apiUseCase } from "../../../../use_case/apiUseCase"
import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../../utill/errUtill";
import { responseReturn } from "../../utill/interface";
import { WebSocketService } from "../../../webSocket";
export class apiController {
    private useCase: apiUseCase
    private webSocket: WebSocketService
    constructor(useCase: apiUseCase, webSocket: WebSocketService) {

        this.useCase = useCase
        this.webSocket = webSocket
    }


    /**
     * @openapi
     * components:
     *  schemas:
     *      defaultOKResponse:
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
     *                  description: data of response
     *      defaultErrorResponse:
     *          type: object
     *          required:
     *              - status
     *              - success
     *              - msg
     *          properties:
     *              status:
     *                  type: string
     *                  description: status of response
     *                  default: error
     *              success:
     *                  type: boolean
     *                  description: success or not
     *                  default: false
     *              msg:
     *                  type: string
     *                  description: message of response
     * 
     */
    public listMethod = async (req: Request, res: Response, next: NextFunction) => {
        let response: responseReturn
        try {
            let allMethod = await this.useCase.listAllMethod();

            response = {
                status: 'success',
                success: true,
                msg: 'List method',
                data: allMethod
            }

            return res.status(200).send(response);
        } catch (error) {
            response = {
                status: 'error',
                success: false,
                msg: getErrorMessage(error)
            }
            return res.status(500).send(response);
        }
    }


    /**
     * @openapi
     * components:
     *  schemas:
     *      updateMethodById:
     *          type: object
     *          required:
     *              - methodId
     *              - available
     *          properties:
     *              methodId:
     *                  type: string
     *                  description: method id
     *              available:
     *                  type: boolean
     *                  description: available or not
     */
    public updateMethodById = async (req: Request, res: Response) => {
        let response: responseReturn
        try {
            let { methodId, available } = req.body
            console.log(methodId, available);

            let updated = await this.useCase.updateMethodById(methodId, available);

            if (this.webSocket) {
                this.webSocket.broadcast(`Method ${updated.methodName} is now : ${updated.available ? 'available' : 'unavailable'}`)
            }
            // broadcast(`Method ${updated.methodName} is now : ${updated.available ? 'available' : 'unavailable'}`)
            response = {
                status: 'success',
                success: true,
                msg: 'Method updated',
                data: updated
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
     *      bisectionRequest:
     *          type: object
     *          required:
     *              - latex
     *              - xl
     *              - xr
     *          properties:
     *              latex:
     *                  type: string
     *                  description: latex of function
     *                  default: x^2-4
     *              xl:
     *                  type: number
     *                  description: xl
     *                  default: 0
     *              xr:
     *                  type: number
     *                  description: xr
     *                  default: 5
     */

    public bisection = async (req: Request, res: Response) => {
        let response: responseReturn
        try {
            let { latex, xl, xr } = req.body
            let result = await this.useCase.bisection(latex, xl, xr);
            response = {
                status: 'success',
                success: true,
                msg: 'Bisection',
                data: result
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
            console.log(response);

            return res.status(400).send(response);
        }
    }


    /**
     * @openapi
     * components:
     *  schemas:
     *      taylorRequest:
     *          type: object
     *          required:
     *              - latex
     *              - x0
     *              - x
     *              - n
     *          properties:
     *              latex:
     *                  type: string
     *                  description: latex of function
     *                  default: log(x)
     *              x0:
     *                  type: number
     *                  description: x0
     *                  default: 2
     *              x:
     *                  type: number
     *                  description: x
     *                  default: 4
     *              n:
     *                  type: number
     *                  description: n
     *                  default: 4
     */


    public taylorSeries = async (req: Request, res: Response) => {
        let response: responseReturn
        try {
            let { latex, x0, n, x } = req.body
            let result = await this.useCase.taylorSeries(latex, x0, n, x);
            response = {
                status: 'success',
                success: true,
                msg: 'Taylor Series',
                data: result
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

    public falsePosition = async (req: Request, res: Response) => {
        let response: responseReturn
        try {
            let body = req.body
            let result = await this.useCase.falsePosition(body);
            response = {
                status: 'success',
                success: true,
                msg: 'False Position',
                data: result
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

            return res.status(400).send(response);
        }
    }

    /**
     * @openapi
     * components:
     *  schemas:
     *      onePointRequest:
     *          type: object
     *          required:
     *              - latex
     *              - x0
     *          properties:
     *              latex:
     *                  type: string
     *                  description: latex of function
     *                  default: 2(1-x^2)/3
     *              x0:
     *                  type: number
     *                  description: x0
     *                  default: 0
     */
    public onePoint = async (req: Request, res: Response) => {
        let response: responseReturn
        try {
            let { latex, x0 } = req.body
            let result = await this.useCase.onePoint(latex, x0);
            response = {
                status: 'success',
                success: true,
                msg: 'One Point',
                data: result
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
     *      newtonRaphsonRequest:
     *          type: object
     *          required:
     *              - latex
     *              - x0
     *          properties:
     *              latex:
     *                  type: string
     *                  description: latex of function
     *                  default: x^2-7
     *              x0:
     *                  type: number
     *                  description: x0
     *                  default: 2
     */
    public newtonRaphson = async (req: Request, res: Response) => {
        let response: responseReturn
        try {
            let { latex, x0 } = req.body
            let result = await this.useCase.newtonRaphson(latex, x0);
            response = {
                status: 'success',
                success: true,
                msg: 'Newton Raphson',
                data: result
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
     *      secantRequest:
     *          type: object
     *          required:
     *              - latex
     *              - x0
     *              - x1
     *          properties:
     *              latex:
     *                  type: string
     *                  description: latex of function
     *                  default: x^2-7
     *              x0:
     *                  type: number
     *                  description: x0
     *                  default: 2
     *              x1:
     *                  type: number
     *                  description: x1
     *                  default: 3
     */

    public secant = async (req: Request, res: Response) => {
        let response: responseReturn
        try {
            let { latex, x0, x1 } = req.body;
            let result = await this.useCase.secant(latex, x0, x1);
            response = {
                status: 'success',
                success: true,
                msg: 'Secant',
                data: result
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
    *      cramerRequest:
    *          type: object
    *          required:
    *              - matrix
    *              - vector
    *          properties:
    *              matrix:
    *                  type: array
    *                  default: [[2,3,5],[3,1,-2],[1,3,4]]
    *                  description: 2d matrix
    *              vector:
    *                  type: array
    *                  default: [0,-2,-3]
    *                  description: vector
    */

    public cramer = async (req: Request, res: Response) => {
        let { matrix, vector } = req.body;
        let response: responseReturn
        try {
            let body = req.body
            let result = await this.useCase.cramersRule(matrix, vector);
            response = {
                status: 'success',
                success: true,
                msg: 'Cramer',
                data: result
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
}
