import type { HttpRequest } from '../types/global';
import type { User } from '../types/users';

export interface IUserService {
    getUsers(data?: unknown): Promise<HttpRequest>;
    createUser(data: User): Promise<HttpRequest>;
    updateUser(params: unknown, data: User): Promise<HttpRequest>;
    deleteUser(params: unknown): Promise<HttpRequest>;
}
