import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from 'database/entities/projects/projects.entity';
import { User } from 'database/entities/users/user.entity';

import { JWTModule } from 'apps/common/jwt/jwt.module';
import { PROJECT_QUENUE_KEY } from 'apps/common/quenue/constants';

import { ProjectsService } from './service/projects.service';

@Module({
  imports: [
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

    JWTModule,
    TypeOrmModule.forFeature([User, Project]),
  ],
  controllers: [],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
