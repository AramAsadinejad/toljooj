import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from 'src/token/auth.guard';
import { GetUser } from 'src/user/user.decorator';
import { UserInterface, UserType } from 'src/user/user.interface';
import { AddressService } from './address.service';
import { AddressCreationOrUpdateInterface, AddressInterface } from './address.interface';
import { CatchClause } from './../../../frontend3/node_modules/@types/estree/index.d';
import { RolesGuard } from 'src/token/roles.guard';
import { Roles } from 'src/user/user.constancts';

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

    @Patch('set-prime/:id/')
    @UseGuards(TokenAuthGuard)
    async setDefaultAddress(
      @Param('id', ParseIntPipe) addressId: number,
      @Body('isDefault') isDefault: boolean = true
    ): Promise<{ message: string }> {
      await this.addressService.setDefaultAddress(addressId, isDefault);
      return { message: `Address ${addressId} updated successfully` };
    }

    @Delete('delete/:id')
    @Roles(UserType.User,UserType.Admin)
    @UseGuards(TokenAuthGuard,RolesGuard)
    async delete(
        @Param('id', ParseIntPipe) addressId: number,
      ){
          return this.addressService.deleteAddress(addressId);
      }

    @Put('update/:id')
    @Roles(UserType.User,UserType.Admin)
    @UseGuards(TokenAuthGuard,RolesGuard)
    async update(@Param('id', ParseIntPipe) addressId: number,@Body('isDefault') isDefault:boolean,@Body('value') value:string){
        return this.addressService.updateAddress(addressId,isDefault,value);
    }

}
