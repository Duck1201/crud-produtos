import { z } from 'zod';
import { ROLE } from '../../generated/prisma/enums';

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(ROLE).default(ROLE.USER),
});
