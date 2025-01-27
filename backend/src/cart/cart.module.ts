import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TokenModule } from 'src/token/token.module';
import { AddressModule } from 'src/address/address.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[TokenModule,AddressModule,DatabaseModule],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
