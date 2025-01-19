import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(private databaseService: DatabaseService) {}

    async signup(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *';
        const user = await this.databaseService.query(query, [username, hashedPassword]);
        return user[0];
      }

      async login(username: string, password: string) {
        const query = 'SELECT * FROM users WHERE username = $1';
        const user = await this.databaseService.query(query, [username]);
        
        if (!user[0]) {
          throw new Error('User not found');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
    
        // Generate a JWT or session token (optional)
        return { message: 'Login successful', user: user[0] };
      }
    
    
}
