import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type { Validator } from '../utils/validation';
import type { IUserMiddleware } from './protocols';

export class UserMiddleware implements IUserMiddleware {
    constructor(private readonly validator: Validator) {}

    handle(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            const result = this.validator.handle(req?.body);

            if (!result.sucess) {
                return res?.status(400).json(result.data);
            }

            next();
        };
    }
}
