import { Controller,Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginInterface, RegisterInterface } from './user.interface';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('register')
    async signup(@Body() body: RegisterInterface) {
      const { username, password } = body;
      return await this.userService.signup(body);
    }

    @Post('login')
    async login(@Body() body: LoginInterface) {
      // const { username, password } = body;
      return await this.userService.login(body);
    }
}
  
  
    

