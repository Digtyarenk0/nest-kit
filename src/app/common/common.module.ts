import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache/service/redis.service';

@Global()
@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CommonModule {}
