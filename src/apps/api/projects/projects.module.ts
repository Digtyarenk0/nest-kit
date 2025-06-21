import { Module } from '@nestjs/common';

import { DatabaseModule } from 'shared/database/database.module';

import { CommonModule } from 'shared/common/common.module';

import { ProjectsService } from './service/projects.service';

import { ProjectsController } from './controller/projects.controller';

@Module({
  imports: [DatabaseModule, CommonModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
