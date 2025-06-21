import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { Job } from 'bull';
import { IProjectsRepository } from 'shared/database/repositories/projects/projects.repo.interface';
import { PROJECT_QUENUE_KEY } from 'shared/infrastructure/projects/constants';

import { GithubService } from 'shared/common/github/service/github.service';

import { delay } from 'shared/utils/delay';

interface ProjectParsingData {
  id: string;
  url: string;
}

@Processor(PROJECT_QUENUE_KEY)
export class ProjectParsingConsumer {
  private readonly logger = new Logger(ProjectParsingConsumer.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly projectRepository: IProjectsRepository,
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
          const dbProject = await this.projectRepository.findOneById(
            project.id,
          );
          if (dbProject) {
            const update = {
              name: data.name,
              repOwner: data.repOwner,
              stars: data.stars,
              forks: data.forks,
              openIssues: data.openIssues,
            };
            await this.projectRepository.updateToParsed(project.id, update);
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
