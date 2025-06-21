import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../users/user.entity';

export enum ProjectsStatus {
  quenue = 'quenue',
  parsing = 'parsing',
  failed = 'failed',
  parsed = 'parsed',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    comment: 'Project name',
    default: null,
    nullable: true,
  })
  name: string | null;

  @Column({
    comment: 'Project name',
    type: 'enum',
    enum: ProjectsStatus,
    default: ProjectsStatus.quenue,
  })
  status: ProjectsStatus;

  @Column({ type: 'varchar', comment: 'Project URL' })
  url: string;

  @Column({ comment: 'Number of stars', default: 0, nullable: true })
  stars: number;

  @Column({ comment: 'Number of forks', default: 0, nullable: true })
  forks: number;

  @Column({ comment: 'Number of open issues', default: 0, nullable: true })
  openIssues: number;

  @CreateDateColumn({ comment: 'Creation date in UTC Unix timestamp format' })
  createdAt: Date;

  @Column({ comment: 'Owner repository', default: '', nullable: true })
  repOwner: string;

  @Column({ comment: 'Parsing error message', default: '', nullable: true })
  error: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ comment: 'Relation to user', default: null, nullable: true })
  ownerId: string | null;
}
