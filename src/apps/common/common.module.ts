import { Global, Module } from '@nestjs/common';

import { CacheService } from './redis/service/cache.service';

import { GithubModule } from './github/github.module';
import { JWTModule } from './jwt/jwt.module';

@Global()
@Module({
  imports: [],
  providers: [CacheService, JWTModule, GithubModule],
  exports: [CacheService, JWTModule, GithubModule],
})
export class CommonModule {}
