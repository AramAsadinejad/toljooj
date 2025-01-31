import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from 'src/token/auth.guard';
import { CartService } from './cart.service';
import { GetUser } from 'src/user/user.decorator';
import { UserInterface } from 'src/user/user.interface';

@Controller('cart')
@UseGuards(TokenAuthGuard)
export class CartController {

    constructor(
        private cartService:CartService
    ){}

    @Get('mine')
    async getCart(@GetUser() user:UserInterface){
        return this.cartService.getCarts(user);
    }

    @Post('add')
    async addToCart(@GetUser() user:UserInterface,@Body('itemId') itemId ,@Body('quantity') quantity){
        return this.cartService.addToCart(user,itemId,quantity);
    }

    @Post('decrease/')
    async decreaseQuantity(@Body('itemId') itemId:number,@Body('cartId') cartId:number){
        console.log(itemId,cartId);
        return this.cartService.decreaseQuantity(itemId,cartId);
    }

    
}
