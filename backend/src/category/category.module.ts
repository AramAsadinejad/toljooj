import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from 'src/token/token.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [DatabaseModule,TokenModule,RestaurantModule],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
