import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports:[DatabaseModule,TokenModule],
  providers: [RestaurantService],
  controllers: [RestaurantController]
})
export class RestaurantModule {}
