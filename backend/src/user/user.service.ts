import { Injectable,Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { LoginInterface, RegisterInterface, TokenInterface, UserInterface } from './user.interface';
import { TokenService } from 'src/token/token.service';
@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(private databaseService: DatabaseService,private tokenService: TokenService) {}

    async signup(data:RegisterInterface):Promise<UserInterface> {
        const hashedPassword = data.password;
        const query = 'INSERT INTO users(username, password,type) VALUES($1, $2,$3) RETURNING *';
        const user = await this.databaseService.query(query, [data.username, hashedPassword,data.type]);
        return user[0];
    }

      async login(data:LoginInterface):Promise<TokenInterface> {
        const query = 'SELECT * FROM users WHERE username = $1';
        const user = await this.databaseService.query(query, [data.username]);
        this.logger.debug(user[0]);
        if (!user[0]) {
          throw new Error('User not found');
        }
        const isPasswordValid=false;
        if(data.password==user[0].password){
          let isPasswordValid = true;
        }
        
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }


        const token = await  this.tokenService.generateToken(user[0]);
        // Generate a JWT or session token (optional)
        return { token };
      }
    
    
}
