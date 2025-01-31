import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { TokenAuthGuard } from 'src/token/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as multer from 'multer';
import { Multer } from 'multer';
// import { File } from 'multer';
import { DEFAULT_REST_IMAGE_URL } from 'src/constants';
import { Roles, ROLES_KEY } from 'src/user/user.constancts';
import { UserInterface, UserType } from 'src/user/user.interface';
import { RolesGuard } from 'src/token/roles.guard';
import { extname } from 'path';
import { GetUser } from 'src/user/user.decorator';
import { RestaurantManagerGuard } from './restaurant.guard';
import { log } from 'console';
import { CreateOpenRestDto, RestaurantCreationInterface, RestaurantUpdateInterface } from './restaurant.interface';

@Controller('restaurant')
@UseGuards(TokenAuthGuard,RolesGuard)
export class RestaurantController {
    constructor(
        private restaurantService:RestaurantService
    ){
    }

    @Get("all")
    @UseGuards(TokenAuthGuard)
    async getAllRestaurants(
      @Query('page') page?: number,
      @Query('limit') limit?: number
    ){
        const pageNumber = Number(page) || 1;
        const pageSize = Number(limit) || 5;
        return this.restaurantService.getAllRestaurants()
    }


    @Get("/:id")
    @UseGuards(TokenAuthGuard)
    async getRestaurantById(@Param("id") id:number){
        return this.restaurantService.getRestaurantWithDetails(id);
    }

    @Post('create')
    @Roles(UserType.RestaurantManager,UserType.Admin)
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads/restaurants',
          filename: (req, file, cb) => {
            const uniqueName = `${uuidv4()}-${file.originalname}`;
            const fileName = `${uniqueName}`;
            cb(null, fileName);
          },
        }),
      }),
    )
    async createRestaurant(
      @UploadedFile() image,
      @Body() restaurantData: RestaurantCreationInterface,
      @GetUser() user:UserInterface
    ) {
      const imageUrl = image ? `/uploads/restaurants/${image.filename}` : DEFAULT_REST_IMAGE_URL;
      return this.restaurantService.create({ ...restaurantData, imageUrl , managerId:user.id});
    }

    @Put('update/:id/')
    @Roles(UserType.RestaurantManager,UserType.Admin)
    // @UseGuards(RestaurantManagerGuard)
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads/restaurants',
          filename: (req, file, cb) => {
            const uniqueName = `${uuidv4()}-${file.originalname}`;
            const fileName = `${uniqueName}`;
            cb(null, fileName);
          },
        }),
      }),
    )
    async upadateRestaurantDetails(
      @Body() body:RestaurantUpdateInterface,
      @Param('id') id:number,
      @UploadedFile() image,
    ){
        if (body.imageUrl)
          return this.restaurantService.upadateRestaurantDetails({...body,id});
        const imageUrl = image ? `/uploads/restaurants/${image.filename}` : DEFAULT_REST_IMAGE_URL;
        return this.restaurantService.upadateRestaurantDetails({...body,imageUrl,id});
    }

    @Post('create/open')
    async createOpenRest(@Body() body:CreateOpenRestDto){
      return this.restaurantService.addOpenRest(body);
    }

    @Get('manager/all/')
    async getManagerRestaurants(@GetUser() user:UserInterface){
      return this.restaurantService.getManagerRestaurants(user.id);
    }

    @Get('open/:id/')
    async getOpenRestsByRestaurantId(@Param('id') id:number){
      return this.restaurantService.getOpenRestsByRestaurantId(id);
    }
  }



