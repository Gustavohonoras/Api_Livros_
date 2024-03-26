import {Request, Response, NextFunction} from "express";
import {ZodError} from "zod";
import {IRequestSchemas} from "../zod/zod";

export class ValidateRequest{
    static execute(schemas: IRequestSchemas) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (schemas.params) {
                    req.params = await schemas.params.parseAsync(req.params);
                }

                if (schemas.body) {
                    req.body = await schemas.body.parseAsync(req.body);
                }

                if (schemas.query) {
                    req.query = await schemas.query.parseAsync(req.query);
                }

                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(409).json(error);
                }
            }
        }
    }
}