import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Project } from 'database/entities/projects/projects.entity';
import { User } from 'database/entities/users/user.entity';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findUserProjects(user: User): Promise<Project[]> {
    return this.projectRepository.find({
      where: { ownerId: user.id },
    });
  }

  async create(user: User, url: string): Promise<{ id: string }> {
    const isExistProject = await this.projectRepository.findOne({
      where: { url },
    });
    if (isExistProject) {
      throw new BadRequestException('This project already axist');
    }

    try {
      const project = await this.projectRepository.save({
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
