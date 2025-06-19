import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Job } from 'bull';
import {
  Project,
  ProjectsStatus,
} from 'database/entities/projects/projects.entity';

import { GithubService } from 'apps/common/github/service/github.service';
import { PROJECT_QUENUE_KEY } from 'apps/common/quenue/constants';
import { delay } from 'apps/common/utils/delay';

interface ProjectParsingData {
  id: string;
  url: string;
}

@Processor(PROJECT_QUENUE_KEY)
export class ProjectParsingConsumer {
  private readonly logger = new Logger(ProjectParsingConsumer.name);

  constructor(
    private readonly githubService: GithubService,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    this.logger.log('ProjectParsingConsumer inited');
  }

  @Process({ concurrency: 1 })
  async handleParsing(job: Job<ProjectParsingData[]>) {
    const projects = job.data;
    this.logger.debug(`Processing projects ${projects.length} `);
    if (!Array.isArray(projects)) return;
    if (Array.isArray(projects) && projects.length === 0) return;

    for await (const project of projects) {
      // rate limit
      await delay(500);
      try {
        this.logger.debug(
          `Processing project ${project.id} with URL ${project.url}`,
        );
        const data = await this.githubService.fetchRepoInfo(project.url);
        if (data) {
          const dbProject = await this.projectRepository.findOne({
            where: { id: project.id },
          });
          if (dbProject) {
            dbProject.name = data.name;
            dbProject.repOwner = data.repOwner;
            dbProject.stars = data.stars;
            dbProject.forks = data.forks;
            dbProject.openIssues = data.openIssues;
            dbProject.status = ProjectsStatus.parsed;
            await this.projectRepository.save(dbProject);
          }
        }
      } catch (error: any) {
        this.logger.debug(
          `Processing error ${project.id} with URL ${project.url}, reason: ${
            error.message || JSON.stringify(error)
          }`,
        );
      }
    }

    return;
  }
}
