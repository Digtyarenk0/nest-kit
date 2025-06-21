import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { Project } from 'shared/database/entities/projects/projects.entity';
import { User } from 'shared/database/entities/users/user.entity';
import { IProjectsRepository } from 'shared/database/repositories/projects/projects.repo.interface';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(private readonly projectRepository: IProjectsRepository) {}

  async findUserProjects(user: User): Promise<Project[]> {
    return this.projectRepository.findByOwnerId(user.id);
  }

  async create(user: User, url: string): Promise<{ id: string }> {
    const isExistProject = await this.projectRepository.findOneByURL(url);
    if (isExistProject) {
      throw new BadRequestException('This project already axist');
    }

    try {
      const project = await this.projectRepository.create({
        url,
        ownerId: user.id,
      });
      return { id: project.id };
    } catch (error) {
      this.logger.log(
        `Error create project: ${error?.message || JSON.stringify(error)}`,
      );
      throw new BadRequestException('Error create project');
    }
  }
}
