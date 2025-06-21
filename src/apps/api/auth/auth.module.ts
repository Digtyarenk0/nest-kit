import { Module } from '@nestjs/common';

import { CommonModule } from 'apps/common/common.module';

import { AuthService } from './services/auth.service';

import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UserModule, CommonModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
