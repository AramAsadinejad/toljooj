import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { DatabaseModule } from 'src/database/database.module';
import { TokenAuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [DatabaseModule],
  providers: [TokenService,TokenAuthGuard],
  exports: [TokenService,TokenAuthGuard],
})
export class TokenModule {}
