import { Module } from '@nestjs/common';

import { GithubService } from './service/github.service';

@Module({
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
