import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { TokenAuthGuard } from 'src/token/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as multer from 'multer';
import { DEFAULT_REST_IMAGE_URL } from 'src/constants';
import { Roles, ROLES_KEY } from 'src/user/user.constancts';
import { UserType } from 'src/user/user.interface';
import { RolesGuard } from 'src/token/roles.guard';
import { extname } from 'path';

@Controller('restaurant')
@UseGuards(TokenAuthGuard,RolesGuard)
export class RestaurantController {
    constructor(
        private restaurantService:RestaurantService
    ){
    }

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

    @Post('create')
    @Roles(UserType.RestaurantManager)
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads/restaurants',
          filename: (req, file, cb) => {
            const uniqueName = `${uuidv4()}-${file.originalname}`;
            const ext = extname(file.originalname);
            const fileName = `${uniqueName}${ext}`;
            cb(null, fileName);
          },
        }),
      }),
    )
    async createRestaurant(
      @UploadedFile() image: multer.File,
      @Body() restaurantData: RestaurantCreationInterface,
    ) {
      // return {};
      const imageUrl = image ? `/uploads/restaurants/${image.filename}` : DEFAULT_REST_IMAGE_URL;
      return this.restaurantService.create({ ...restaurantData, imageUrl });
    }
  }



