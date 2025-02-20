import { ForbiddenException, HttpException, Injectable,Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { LoginInterface, RegisterInterface, TokenInterface, UserInterface } from './user.interface';
import { TokenService } from 'src/token/token.service';
import { UserDTO } from './user.dto';
@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(private databaseService: DatabaseService,private tokenService: TokenService) {}

    async signup(data:RegisterInterface):Promise<UserInterface> {
      if (await this.isUnqiue(data.username)){
        const hashedPassword = data.password;
        const query = 'INSERT INTO users(username, password,type) VALUES($1, $2,$3) RETURNING *';
        const user = await this.databaseService.query<UserInterface>(query, [data.username, hashedPassword,data.type]);
        return user[0];
      }
      throw new ForbiddenException('User already exists');
    }

      async login(data:LoginInterface):Promise<TokenInterface> {
        const query = 'SELECT * FROM users WHERE username = $1';
        // console.log(data);
        
        const user = await this.databaseService.query<UserInterface>(query, [data.username]);
        // console.log(user);
        
        this.logger.debug(user[0]);
        if (!user[0]) {
          throw new Error('User not found');
        }
        let isPasswordValid=false;
        if(data.password==user[0].password){
          isPasswordValid = true;
        }
        
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }


        const token = await  this.tokenService.generateToken(user[0]);
        // Generate a JWT or session token (optional)
        return { token };
      }

    private async isUnqiue(username:string){
        const result = await this.databaseService.query("select finduserbyusername($1)",[username]);
        // console.log(result.length === 1);
        console.log(result);
        
        if (result.length === 0)
          return true
        return false
        
        
    }

    async createUser(body:RegisterInterface){
      const query = "select * from create_user($1,$2,$3)";
      return this.databaseService.query(query,[body.username,body.password,body.type]);
    }

    async deleteUser(id:number){
      const query = "select * from delete_user($1)";
      return this.databaseService.query(query,[id]);
    }

    async updateUser(id:number,username:string){
      const query = "select * from update_username($1,$2)";
      return this.databaseService.query(query,[id,username]);
    }

    async getAllUsers(){
      const query = "select * from get_users_with_addresses()";
      const rows = await this.databaseService.query<any>(query);
      const userMap = new Map<number, UserDTO>();

      for (const row of rows) {
        if (!userMap.has(row.user_id)) {
          userMap.set(row.user_id, {
            userId: row.user_id,
            username: row.username,
            email: row.email,
            addresses: [],
          });
        }
  
        if (row.address_id) {
          userMap.get(row.user_id).addresses.push({
            addressId: row.address_id,
            isDefault: row.isdefault, // Note: PostgreSQL returns lowercase for columns
            value: row.address_value,
          });
        }
      }
  
      return Array.from(userMap.values());
    }

    
    
}
