import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports:[DatabaseModule,TokenModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
