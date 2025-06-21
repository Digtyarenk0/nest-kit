import { Module } from '@nestjs/common';

import { DatabaseModule } from 'shared/database/database.module';

import { CommonModule } from 'shared/common/common.module';

import { AuthService } from './services/auth.service';

import { UserModule } from '../../../shared/infrastructure/user/user.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [DatabaseModule, CommonModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
