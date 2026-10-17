import type { IBcryptMananger } from './protocols';
import bcrypt from 'bcrypt';

export class BcryptManager implements IBcryptMananger {
    public async toHash(password: string, salt: number = 12): Promise<string> {
        try {
            const hash = await bcrypt.hash(password, salt);

            return hash;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack || error);
            }

            throw error;
        }
    }
    public async isHashValid(hash: string, secret: string): Promise<boolean> {
        try {
            const validHash = await bcrypt.compare(hash, secret);

            return validHash;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack || error);
            }

            throw error;
        }
    }
}
