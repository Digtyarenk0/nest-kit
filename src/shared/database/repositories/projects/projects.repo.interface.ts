import { Provider } from '@nestjs/common';

import {
  Project,
  ProjectsStatus,
} from 'shared/database/entities/projects/projects.entity';

import { PorjectsRepository } from './projects.repo';

export interface ICreateProjects {
  url: string;
  ownerId: string;
}

export interface IUpdateProjects {
  name: string;
  repOwner: string;
  stars: number;
  forks: number;
  openIssues: number;
}

export abstract class IProjectsRepository {
  abstract findByOwnerId(id: string): Promise<Project[]>;
  abstract findOneById(id: string): Promise<Project | null>;
  abstract findOneByURL(url: string): Promise<Project | null>;
  abstract findByStatus(status: ProjectsStatus): Promise<Project[]>;

  abstract create(project: ICreateProjects): Promise<Project>;

  abstract updateToParsed(id: string, project: IUpdateProjects): Promise<void>;
}

export const PROJECTS_REPOSITORY: Provider = {
  provide: IProjectsRepository,
  useClass: PorjectsRepository,
};
