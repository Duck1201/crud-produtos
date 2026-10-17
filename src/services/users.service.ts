import { prisma } from '../../lib/prisma';
import type { HttpRequest } from '../types/global';
import type { User, UserPagination } from '../types/users';
import { PaginationDefault } from '../types/global';
import type { IUserService } from './protocols';
import { ROLE } from '../../generated/prisma/enums';
import { BcryptManager } from '../utils/bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

export class UserService implements IUserService {
    public async getUsers(data?: UserPagination): Promise<HttpRequest> {
        const limit = Number(data?.limit) || Number(PaginationDefault.limit);
        const page = Number(data?.page) || Number(PaginationDefault.page);

        try {
            const users = await prisma.user.findMany({ where: { name: { contains: data?.name as string }, email: { contains: data?.email as string }, role: data?.role as ROLE }, take: limit, skip: (page - 1) * limit });

            return {
                statusCode: 200,
                body: users,
            };
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack || error);
            }

            return {
                statusCode: 500,
                body: {
                    message: 'Erro interno no servidor.',
                },
            };
        }
    }

    public async createUser(data: User): Promise<HttpRequest> {
        const { email, name, password, role } = data;
        const bcryptManager = new BcryptManager();

        try {
            const hash = await bcryptManager.toHash(password);

            const newUser = await prisma.user.create({
                data: { role: role || ROLE.USER, email: email.toLowerCase(), name: name.toLowerCase(), password: hash },
            });

            return {
                statusCode: 201,
                body: {
                    message: 'Usuário criado com sucesso!',
                    id: newUser.id,
                },
            };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return {
                        statusCode: 409,
                        body: {
                            message: 'Usuário já cadastrado.',
                        },
                    };
                }
            }

            if (error instanceof Error) {
                console.error(error.stack || error);
            }

            return {
                statusCode: 500,
                body: {
                    message: 'Erro interno no servidor.',
                },
            };
        }
    }

    public async updateUser(params: { id: string }, data: User): Promise<HttpRequest> {
        const bcryptManager = new BcryptManager();
        const { email, name, password, role } = data;
        let hash = password;

        try {
            if (password) {
                hash = await bcryptManager.toHash(password);
            }

            const updatedUser = await prisma.user.update({
                where: { id: params?.id },
                data: {
                    role: role || ROLE.USER,
                    email: email.toLowerCase(),
                    name: name.toLowerCase(),
                    password: hash,
                },
            });

            return {
                statusCode: 200,
                body: {
                    message: 'Usuário modificado com sucesso.',
                    id: updatedUser.id,
                },
            };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return {
                        statusCode: 409,
                        body: {
                            message: 'Usuário já cadastrado.',
                        },
                    };
                }
            }

            if (error instanceof Error) {
                console.error(error.stack || error);
            }

            return {
                statusCode: 500,
                body: {
                    message: 'Erro interno no servidor.',
                },
            };
        }
    }

    public async deleteUser(params: unknown): Promise<HttpRequest> {
        try {
            await prisma.user.delete({ where: { id: params?.id } });

            return {
                statusCode: 200,
                body: {
                    message: 'Usuário removido com sucesso!',
                },
            };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return {
                        statusCode: 409,
                        body: {
                            message: 'O usuário não existe.',
                        },
                    };
                }
            }

            if (error instanceof Error) {
                console.error(error.stack || error);
            }

            return {
                statusCode: 200,
                body: {
                    message: 'Usuário removido com sucesso!',
                },
            };
        }
    }
}
