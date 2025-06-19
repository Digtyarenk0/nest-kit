import { Global, Module } from '@nestjs/common';

import { GithubService } from './service/github.service';

@Global()
@Module({
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
