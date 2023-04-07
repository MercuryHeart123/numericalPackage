import { Application, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Numerical 65 API",
            version: "1.0.0",
            description: "API for Numerical 65",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
    },

    apis: ["./src/interface/express/routes/routers/*.ts", "./src/interface/express/routes/controllers/*.ts"],
};


const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Application) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/swagger.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    }
    );
};

