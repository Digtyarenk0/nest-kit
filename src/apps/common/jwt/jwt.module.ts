import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as JwtNestService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'database/entities/users/user.entity';

import { JWTService } from './service/jwt.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [JWTService, JwtNestService, ConfigService],
  exports: [JWTService],
})
export class JWTModule {}
