import { Controller,Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginInterface, RegisterInterface, UserInterface } from './user.interface';
import { TokenAuthGuard } from 'src/token/auth.guard';
import { GetUser } from './user.decorator';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('register')
    async signup(@Body() body: RegisterInterface) {
      return await this.userService.signup(body);
    }

    @Post('login')
    async login(@Body() body: LoginInterface) {
      // const { username, password } = body;
      return await this.userService.login(body);
    }

    @Get("me")
    @UseGuards(TokenAuthGuard)
    async getMe(@GetUser() user:UserInterface){
        return user;
    }
}
  
  
    

