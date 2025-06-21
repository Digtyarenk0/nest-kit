import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from 'database/entities/projects/projects.entity';
import { User } from 'database/entities/users/user.entity';

import { CommonModule } from 'apps/common/common.module';

import { ProjectsService } from './service/projects.service';

import { ProjectsController } from './controller/projects.controller';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([User, Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
