import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseConfig } from 'shared/database/configs';

import { JWTConfig } from '../common/auth/configs/jwt.config';
import { CacheConfig } from '../common/redis/config';

import configuration from 'config/configuration';

// Import all configs
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [JWTConfig, CacheConfig, DatabaseConfig],
  exports: [JWTConfig, CacheConfig, DatabaseConfig],
})
export class ConfigurationModule {}
