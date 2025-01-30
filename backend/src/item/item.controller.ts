import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ItemService } from './item.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as multer from 'multer';
import { ItemCreationInterface } from './item.interface';
import { DEFAULT_ITEM_IMAGE_URL } from 'src/constants';
import { TokenAuthGuard } from 'src/token/auth.guard';
// import { File } from 'multer';

@Controller('item')
@UseGuards(TokenAuthGuard)
export class ItemController {
    constructor(
       private readonly itemService:ItemService 
    ){}

    @Post('create')
    @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: './uploads/items',
            filename: (req, file, cb) => {
              const uniqueName = `${uuidv4()}-${file.originalname}`;
              const ext = extname(file.originalname);
              const fileName = `${uniqueName}${ext}`;
              cb(null, fileName);
            },
          }),
        }),
      )
    async createItem(
        @UploadedFile() image,
        @Body() itemData: ItemCreationInterface
    ){
        const imageUrl = image ? `/uploads/items/${image.filename}` : DEFAULT_ITEM_IMAGE_URL;
        return this.itemService.create(itemData,imageUrl);
    }

    @Get('category/:id/')
    async getItemsByCategory(@Param('id') id:number){
        return this.itemService.getItemsByCategory(id);
    }
}
