import { Global, Module } from '@nestjs/common';
import { CacheService } from './service/redis.service';

@Module({
  imports: [CacheService],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
