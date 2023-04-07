import Express, { Router } from "express";
import { authController } from "../controllers/authcontroller"

export const authRouter = (AuthController: authController) => {
    const router: Router = Express.Router()


    /**
     * @openapi
     * /auth/login:
     *  get:
     *    tags:
     *    - auth
     *    description: verify login token
     *    security:
     *      - bearerAuth: [] 
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/getLogin'
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     */
    router.get('/login', AuthController.loginVerify)


    /**
     * @openapi
     * /auth/login:
     *  post:
     *    tags:
     *    - auth
     *    description: Get login token
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *       schema:
     *        $ref: '#/components/schemas/loginRequest'
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/defaultOKResponse'
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     */
    router.post('/login', AuthController.postLogin)

    /**
     * @openapi
     * /auth/register:
     *  post:
     *    tags:
     *    - auth
     *    description: Register new user
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *       schema:
     *        $ref: '#/components/schemas/registerRequest'
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/defaultOKResponse'
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     */
    router.post('/register', AuthController.registerOne)
    return router
}



