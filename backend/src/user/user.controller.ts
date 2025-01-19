import { Controller,Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('signup')
    async signup(@Body() body: { username: string, password: string }) {
      const { username, password } = body;
      return await this.userService.signup(username, password);
    }

    @Post('login')
    async login(@Body() body: { username: string, password: string }) {
      const { username, password } = body;
      return await this.userService.login(username, password);
    }
}
  
  
    

