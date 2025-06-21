import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { DatabaseModule } from 'shared/database/database.module';
import { PROJECT_QUENUE_KEY } from 'shared/infrastructure/projects/constants';

import { GithubModule } from 'shared/common/github/github.module';

import { ProjectParsingConsumer } from './consumers/project-parsing.consumer';

@Module({
  imports: [
    DatabaseModule,
    GithubModule,
    BullModule.registerQueue({
      name: PROJECT_QUENUE_KEY,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
      limiter: {
        max: 1,
        duration: 1000,
      },
    }),
  ],
  controllers: [],
  providers: [ProjectParsingConsumer],
  exports: [ProjectParsingConsumer],
})
export class ProjectsProcessModule {}
