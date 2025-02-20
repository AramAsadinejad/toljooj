import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { RestaurantManagerGuard } from 'src/restaurant/restaurant.guard';
import { TokenAuthGuard } from 'src/token/auth.guard';

@Controller('category')
@UseGuards(TokenAuthGuard)
export class CategoryController {

    constructor(
        private readonly categoryService:CategoryService
    ){}

    @Get('restaurant/:id')
    async getCategoriesByRestaurantId(@Param('id') id:number){
        return this.categoryService.getCategoriesByRestaurantId(id);
    }

    @Post('create/:id/')
    // @UseGuards(RestaurantManagerGuard)
    async createCategory(@Body('name') name:string,@Param('id') restaurantId:number){
        return this.categoryService.createCategory(name,restaurantId);
    }

    @Put('update/:id/')
    async updateCategory(@Param('id') id:number,@Body('name') name:string){
        console.log(name);
        return this.categoryService.updateCategory(id,name);
    }

    @Delete('delete/:id/')
    async deleteCategory(@Param('id') id:number){
        return this.categoryService.deleteCategory(id);
    }
}

