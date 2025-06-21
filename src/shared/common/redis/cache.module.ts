import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';

import { CacheService } from './service/cache.service';

import { CacheConfig } from './config';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [CacheConfig],
      useFactory: (config: CacheConfig) => {
        return {
          type: 'single',
          nodes: 1,
          options: {
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password,
          },
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
