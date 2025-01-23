import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { TokenModule } from './token/token.module';
import { TestController } from './test/test.controller';
import { AddressModule } from './address/address.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [UserModule, DatabaseModule, TokenModule, AddressModule, RestaurantModule],
  providers: [DatabaseService],
  controllers: [TestController],
})
export class AppModule {}
