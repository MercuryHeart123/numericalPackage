import Express, { Router } from "express";
import { apiController } from "../controllers/apicontroller"
import { authController } from "../controllers/authcontroller";

export const apiRouter = (ApiController: apiController, AuthController: authController) => {
    const router: Router = Express.Router()


    /**
     * @openapi
     * /api/listMethod:
     *  get:
     *    tags:
     *    - api
     *    description: Get all method
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
    router.get('/listMethod', ApiController.listMethod)

    /**
     * @openapi
     * /api/updateMethodById:
     *  post:
     *    tags:
     *      - api
     *    description: Update method by id
     *    security:
     *      - bearerAuth: []
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *       schema:
     *        $ref: '#/components/schemas/updateMethodById'
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/defaultOKResponse'
     *     '401':
     *      description: Unauthorized
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     * 
     */
    router.post('/updateMethodById', AuthController.verifyAdmin, ApiController.updateMethodById)

    /**
     * @openapi
     * /api/bisection:
     *  post:
     *    tags:
     *      - api
     *    description: Bisection method
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *       schema:
     *        $ref: '#/components/schemas/bisectionRequest'
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/defaultOKResponse'
     * 
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     * 
     */
    router.post('/bisection', ApiController.bisection)

    /**
     * @openapi
     * /api/taylor:
     *  post:
     *    tags:
     *      - api
     *    description: taylor series method
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *       schema:
     *        $ref: '#/components/schemas/taylorRequest'
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/defaultOKResponse'
     * 
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     * 
     */
    router.post('/taylor', ApiController.taylorSeries)

    /**
     * @openapi
     * /api/falsePosition:
     *  post:
     *    tags:
     *      - api
     *    description: falsePosition method
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *       schema:
     *        $ref: '#/components/schemas/bisectionRequest'
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/defaultOKResponse'
     * 
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     * 
     */
    router.post('/falsePosition', ApiController.falsePosition)

    /**
     * @openapi
     * /api/onePoint:
     *  post:
     *    tags:
     *      - api
     *    description: onePoint method
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *       schema:
     *        $ref: '#/components/schemas/onePointRequest'
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/defaultOKResponse'
     * 
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     * 
     */
    router.post('/onePoint', ApiController.onePoint)

    /**
     * @openapi
     * /api/newtonRaphson:
     *  post:
     *    tags:
     *      - api
     *    description: newtonRaphson method
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *       schema:
     *        $ref: '#/components/schemas/newtonRaphsonRequest'
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/defaultOKResponse'
     * 
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     * 
     */
    router.post('/newtonRaphson', ApiController.newtonRaphson)


    /**
     * @openapi
     * /api/secant:
     *  post:
     *    tags:
     *      - api
     *    description: secant method
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *       schema:
     *        $ref: '#/components/schemas/secantRequest'
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/defaultOKResponse'
     * 
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     * 
     */
    router.post('/secant', ApiController.secant)

    /**
     * @openapi
     * /api/cramer:
     *  post:
     *    tags:
     *      - api
     *    description: cramer rule method
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *       schema:
     *        $ref: '#/components/schemas/cramerRequest'
     *    responses:
     *     '200':
     *          description: A successful response
     *          content:
     *             application/json:
     *                schema:
     *                  $ref: '#/components/schemas/defaultOKResponse'
     * 
     *     '500':
     *      description: Internal server error
     *      content:
     *         application/json:
     *            schema:
     *              $ref: '#/components/schemas/defaultErrorResponse'
     * 
     */
    router.post('/cramer', ApiController.cramer)

    return router
}
