import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserInterface } from 'src/user/user.interface';

@Injectable()
export class TokenService {
    constructor(private dataBaseService:DatabaseService){}


    async generateToken(user:UserInterface) {
        const token = Buffer.from(`${user.id}:${user.username}:${Date.now()}`).toString('base64');
        return token;
    }

    async validateToken(token: string): Promise<UserInterface | null> {
        try {
            const decoded = Buffer.from(token, 'base64').toString('ascii');
            const [id, username] = decoded.split(':');
            const user = this.dataBaseService.query('SELECT * FROM users WHERE id = $1 AND username = $2', [id, username])[0];
            if (user){
                return user;
            }
            return null;
        } catch (error) {
                return null;
        }
    }
}

