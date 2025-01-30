import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from 'src/token/token.module';
import { RestaurantManagerGuard } from './restaurant.guard';

@Module({
  imports:[DatabaseModule,TokenModule],
  providers: [RestaurantService,RestaurantManagerGuard],
  controllers: [RestaurantController],
  exports:[RestaurantManagerGuard,RestaurantService]
})
export class RestaurantModule {}
