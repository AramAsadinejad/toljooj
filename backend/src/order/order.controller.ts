import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetUser } from 'src/user/user.decorator';
import { UserInterface, UserType } from 'src/user/user.interface';
import { TokenAuthGuard } from 'src/token/auth.guard';
import { Roles } from 'src/user/user.constancts';
import { RolesGuard } from 'src/token/roles.guard';

@Controller('order')
@UseGuards(TokenAuthGuard)
export class OrderController {
    constructor(
        private readonly orderService:OrderService
    ) {}

    @Get('/mine')
    async getOrder(@GetUser() user:UserInterface){
        return this.orderService.getOrders(user);
    }

    @Post('/create')
    async createOrder(@Body('cartId') cartId ,@Body('deliveryFee') deliveryFee,@Body('isPurchased') isPurchased){
        return this.orderService.createOrder(cartId,deliveryFee,isPurchased);
    }   

    @Get('/manager/pending')
    @Roles(UserType.RestaurantManager)
    @UseGuards(RolesGuard)
    async getManagerPendingOrders(@GetUser() user:UserInterface){
        return this.orderService.getManagerPendingOrders(user.id);
    }

    @Delete('/delete/:id/')
    async deletePendingOrder(@GetUser() user:UserInterface,@Param('id') orderId:number){
        return this.orderService.deletePendingOrder(orderId);
    }

    @Patch('set-status/:id/')
    async setOrderStatus(@Param('id') orderId:number,@Body('deliveryFee') deliveryFee:number){
        return this.orderService.setOrderStatus(orderId,deliveryFee);
    }

    @Get('all')
    @Roles(UserType.Admin)
    @UseGuards(RolesGuard)
    async getAllOrders(){
        return this.orderService.getAllOrders();
    }

    @Delete('/actual-delete/:id/')
    async deleteOrder(@Param('id') orderId:number){
        return this.orderService.deleteOrder(orderId);
    }

}
