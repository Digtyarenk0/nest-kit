import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import {
  Project,
  ProjectsStatus,
} from 'shared/database/entities/projects/projects.entity';

import {
  ICreateProjects,
  IProjectsRepository,
  IUpdateProjects,
} from './projects.repo.interface';

@Injectable()
export class PorjectsRepository implements IProjectsRepository {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findByOwnerId(id: string): Promise<Project[]> {
    return await this.projectRepository.find({
      where: { id },
    });
  }

  async findOneByURL(url: string): Promise<Project | null> {
    return await this.projectRepository.findOne({
      where: { url },
    });
  }

  async findOneById(id: string): Promise<Project | null> {
    return await this.projectRepository.findOne({
      where: { id },
    });
  }

  async findByStatus(status: ProjectsStatus): Promise<Project[]> {
    return await this.projectRepository.find({
      where: { status },
    });
  }

  async create(project: ICreateProjects): Promise<Project> {
    return this.projectRepository.save(project);
  }

  async updateToParsed(id: string, project: IUpdateProjects): Promise<void> {
    await this.projectRepository.update(id, {
      ...project,
      status: ProjectsStatus.parsed,
    });
  }
}
