import type { Response, Request } from 'express';

export interface IUserController {
    getUsers: (req: Request, res: Response) => Promise<Response>;
    createUser: (req: Request, res: Response) => Promise<Response>;
    updateUser: (req: Request, res: Response) => Promise<Response>;
    deleteUser: (req: Request, res: Response) => Promise<Response>;
}
