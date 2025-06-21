import { Module } from '@nestjs/common';

import { JWTAuthModule } from './auth/auth.jwt.module';
import { GithubModule } from './github/github.module';
import { CacheModule } from './redis/cache.module';

@Module({
  imports: [CacheModule, JWTAuthModule, GithubModule],
  exports: [CacheModule, JWTAuthModule, GithubModule],
})
export class CommonModule {}
