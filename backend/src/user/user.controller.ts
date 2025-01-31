import { Controller,Post, Body, Get, UseGuards, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginInterface, RegisterInterface, UserInterface, UserType } from './user.interface';
import { TokenAuthGuard } from 'src/token/auth.guard';
import { GetUser } from './user.decorator';
import { Roles } from './user.constancts';

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

    @Post('create/')
    @Roles(UserType.Admin)
    @UseGuards(TokenAuthGuard)
    async create(@Body() body:RegisterInterface) {
        return this.userService.createUser(body);
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id:number){
      return this.userService.deleteUser(id);
    }
}
  
  
    

