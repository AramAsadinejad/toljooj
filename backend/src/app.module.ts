import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { TokenModule } from './token/token.module';
import { TestController } from './test/test.controller';
import { AddressModule } from './address/address.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CartModule } from './cart/cart.module';
import { ItemModule } from './item/item.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [UserModule, DatabaseModule, TokenModule, AddressModule, RestaurantModule, CartModule, ItemModule, CategoryModule, OrderModule],
  providers: [
    DatabaseService,
  ],
  controllers: [TestController],
})
export class AppModule {}
