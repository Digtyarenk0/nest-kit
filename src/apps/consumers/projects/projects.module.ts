import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from 'database/entities/projects/projects.entity';

import { GithubModule } from 'apps/common/github/github.module';
import { PROJECT_QUENUE_KEY } from 'apps/common/quenue/constants';

import { ProjectParsingConsumer } from './consumers/project-parsing.consumer';

@Module({
  imports: [
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
    TypeOrmModule.forFeature([Project]),
  ],
  controllers: [],
  providers: [ProjectParsingConsumer],
  exports: [ProjectParsingConsumer],
})
export class ProjectsProcessModule {}
