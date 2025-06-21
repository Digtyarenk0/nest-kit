import { Module } from '@nestjs/common';

import { DatabaseModule } from 'shared/database/database.module';

import { UserService } from './services/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
