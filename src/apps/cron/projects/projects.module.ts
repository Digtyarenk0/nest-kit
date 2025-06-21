import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'shared/database/database.module';
import { Project } from 'shared/database/entities/projects/projects.entity';
import { User } from 'shared/database/entities/users/user.entity';
import { PROJECT_QUENUE_KEY } from 'shared/infrastructure/projects/constants';

import { ProjectsService } from './service/projects.service';

@Module({
  imports: [
    DatabaseModule,
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
    TypeOrmModule.forFeature([User, Project]),
  ],
  controllers: [],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
