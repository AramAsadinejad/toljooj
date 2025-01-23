import { Injectable } from '@nestjs/common';
import { log } from 'node:console';
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

            const decoded = Buffer.from(token, 'base64').toString('ascii');
            // console.log(decoded);
            
            const [id, username] = decoded.split(':');
            // console.log(id,username);
            
            return this.dataBaseService.query<UserInterface>('SELECT * FROM users WHERE id = $1 AND username = $2', [id, username])
            .then(res=>{
                // console.log(res[0]);
                const user = res[0];
                // console.log(user);
                
                if (user)
                    return user;
                return null;
            })
            .catch(err=>{
                return null;
            });
            // console.log(user);
            

    }
}

