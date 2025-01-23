import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from 'src/token/auth.guard';
import { GetUser } from 'src/user/user.decorator';
import { UserInterface } from 'src/user/user.interface';
import { AddressService } from './address.service';
import { AddressCreationOrUpdateInterface, AddressInterface } from './address.interface';
import { CatchClause } from './../../../frontend3/node_modules/@types/estree/index.d';

@Controller('address')
export class AddressController {

    constructor(
        private addressService:AddressService
    ){}

    @Post('create')
    @UseGuards(TokenAuthGuard)
    async create(@GetUser() user:UserInterface,@Body() body:any) : Promise<any> {
        // console.log(user);
        
        // const data = {...body,user};
        body['user'] = user;
        return this.addressService.createAndUpdate(body)
        .catch(err=>{
            throw new Error(err);
        });

    }

    @Get('mine')
    @UseGuards(TokenAuthGuard)
    async getAdressesByUser(@GetUser() user:UserInterface){
        return this.addressService.getAdressesByUser(user);

    }

}
