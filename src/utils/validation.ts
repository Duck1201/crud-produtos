import type { IZodValidator } from './protocols';
import type { ZodType } from 'zod';

export class Validator implements IZodValidator {
    constructor(private readonly schema: ZodType) {}

    handle(data: unknown): any {
        const parsed = this.schema.safeParse(data);

        if (!parsed.success) {
            return {
                sucess: false,
                data: parsed.error.issues,
            };
        }

        return {
            sucess: true,
            data: parsed.data,
        };
    }
}
