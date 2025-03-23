import { Global, Module } from '@nestjs/common';

import { CacheService } from './service/cache.service';

@Global()
@Module({
  imports: [CacheService],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
