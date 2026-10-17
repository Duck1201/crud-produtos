import type { ZodType } from 'zod';

export interface IBcryptMananger {
    toHash(password: string, salt: number): Promise<string>;
    isHashValid(hash: string, secret: string): Promise<boolean>;
}

export interface IZodValidator {
    handle(data: unknown): ZodType;
}
