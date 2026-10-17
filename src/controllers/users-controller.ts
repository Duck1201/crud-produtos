import type { IUserService } from '../services/protocols';
import type { IUserController } from './protocols';
import type { Request, Response } from 'express';

export class UserController implements IUserController {
    constructor(private readonly userService: IUserService) {}

    public getUsers = async (req: Request, res: Response): Promise<Response> => {
        const { body, statusCode } = await this.userService.getUsers(req?.query);

        return res.status(statusCode).json(body);
    };

    public createUser = async (req: Request, res: Response): Promise<Response> => {
        const { body, statusCode } = await this.userService.createUser(req?.body);

        return res.status(statusCode).json(body);
    };

    public updateUser = async (req: Request, res: Response): Promise<Response> => {
        const { body, statusCode } = await this.userService.updateUser(req?.params, req?.body);

        return res.status(statusCode).json(body);
    };

    public deleteUser = async (req: Request, res: Response): Promise<Response> => {
        const { body, statusCode } = await this.userService.deleteUser(req?.params);

        return res.status(statusCode).json(body);
    };
}
