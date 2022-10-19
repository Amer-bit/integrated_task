import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class HashUtils {
    async hashData(data: string): Promise<string> {
        try {
            const salt = await genSalt();
            const hashedData = await hash(data, salt);
            return hashedData;
        } catch (error) {
            throw new Error(error);
        }
    }

    async compareHash(data: string, hasedData: string): Promise<boolean>{
        try {
        const isMatch = await compare(data, hasedData);
        return isMatch;
        } catch (error) {
            throw new Error(error);
        }
    }
}