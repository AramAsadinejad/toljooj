import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [UserModule],
  providers: [DatabaseService],
})
export class AppModule {}
