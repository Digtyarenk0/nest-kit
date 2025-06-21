import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Queue } from 'bull';
import { ProjectsStatus } from 'shared/database/entities/projects/projects.entity';
import { IProjectsRepository } from 'shared/database/repositories/projects/projects.repo.interface';
import { PROJECT_QUENUE_KEY } from 'shared/infrastructure/projects/constants';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectQueue(PROJECT_QUENUE_KEY)
    private readonly projectParsingQuenue: Queue,
    private readonly projectRepository: IProjectsRepository,
  ) {
    this.processQueuedProjects();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async processQueuedProjects() {
    try {
      const queuedProjects = await this.projectRepository.findByStatus(
        ProjectsStatus.quenue,
      );
      if (queuedProjects.length > 0) {
        this.logger.log(`Found ${queuedProjects.length} projects in queue`);
        const quenueData = queuedProjects.map((p) => ({
          id: p.id,
          url: p.url,
        }));
        await this.projectParsingQuenue.add(quenueData);
      } else {
        this.logger.log('No projects in queue');
      }
    } catch (error) {
      this.logger.error(`Error processing queued projects: ${error.message}`);
    }
  }
}
