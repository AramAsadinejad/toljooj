import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { DatabaseModule } from 'src/database/database.module';
import { AddressController } from './address.controller';

import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [DatabaseModule,TokenModule],
  providers: [AddressService],
  controllers: [AddressController],
  exports:[AddressService]
})
export class AddressModule {}
