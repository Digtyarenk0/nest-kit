import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtAuthService } from './services/jwt.service';

import { JWTConfig } from './configs/jwt.config';
import { JWTTokensLifeTime } from './constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [JWTConfig],
      useFactory: (config: JWTConfig) => ({
        secret: config.accessSecret,
        signOptions: { expiresIn: JWTTokensLifeTime.accessToken },
      }),
    }),
  ],
  providers: [JwtAuthService, JWTConfig],
  exports: [JwtAuthService],
})
export class JWTAuthModule {}
