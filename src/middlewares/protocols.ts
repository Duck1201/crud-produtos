import type { RequestHandler } from 'express';

export interface IUserMiddleware {
    handle(): RequestHandler;
}
