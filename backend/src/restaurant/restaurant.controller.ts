import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { TokenAuthGuard } from 'src/token/auth.guard';

@Controller('restaurant')
export class RestaurantController {
    constructor(
        private restaurantService:RestaurantService
    ){}

    @Get("all")
    @UseGuards(TokenAuthGuard)
    async getAllRestaurants(){
        return this.restaurantService.getAllRestaurants()
    }


    @Get("/:id")
    @UseGuards(TokenAuthGuard)
    async getRestaurantById(@Param("id") id:number){
        return this.restaurantService.getRestaurantWithDetails(id);
    }


}
