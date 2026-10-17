import type { ROLE } from '../../generated/prisma/enums';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role?: ROLE;
}

export interface UserPagination {
    limit?: number;
    page?: number;
    name?: string;
    email?: string;
    role?: ROLE;
}
