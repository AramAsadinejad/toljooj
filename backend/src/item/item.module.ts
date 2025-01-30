import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [DatabaseModule,TokenModule],
  providers: [ItemService],
  controllers: [ItemController]
})
export class ItemModule {}
