import { Global, Module } from '@nestjs/common';

import { CacheService } from './redis/service/cache.service';

@Global()
@Module({
  imports: [],
  providers: [CacheService],
  exports: [CacheService],
})
export class CommonModule {}
